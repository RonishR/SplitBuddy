const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const { UserSchema, UpdateSchema } = require("../types");
const jwt = require("jsonwebtoken");
const { generateUserToken, verifyUserToken } = require("../authMiddlewares");

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const parsedPayload = UserSchema.safeParse(payload);
  if (!parsedPayload.success) {
    return res.status(401).json({
      msg: "Wrong Input",
      error: parsedPayload.error.error,
    });
  } else {
    const existingUser = await User.findOne({ username: payload.username });
    console.log(existingUser);
    if (existingUser) {
      return res.status(401).json({
        message: "User already exists",
      });
    } else {
      var newUser = new User({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
      });

      var hashedPassword = await newUser.createHash(req.payload.password);
      newUser.password_hash = hashedPassword;

      await newUser.save();
      return res.status(201).json({
        message: "User Created Successfully",
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const payload = req.body;
  const existingUser = await User.findOne({
    username: payload.username,
  });
  if (existingUser) {
    if (await existingUser.validatePassword(payload.password)) {
      console.log(existingUser.username);
      const token = generateUserToken(existingUser.username);
      return res.status(200).json({
        message: "User Successfully Logged In",
        jwt: token,
      });
    } else {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }
  } else {
    return res.status(400).json({
      message: "Username incorrect or does not exist",
    });
  }
});

router.post("/update", verifyUserToken, async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ username: req.user });
  if (user) {
    const parsedPayload = UpdateSchema.safeParse(req.body);
    if (!parsedPayload.success) {
      return res.status(404).json({
        message: "Wrong Input",
        error: parsedPayload.error.error,
      });
    } else {
      const updateData = req.body;
      if (updateData.password) {
        updateData.password_hash = await user.createHash(updateData.password);
        delete updateData.password;
      }
      await User.updateOne(
        {
          username: req.user,
        },
        { $set: updateData }
      );
      return res.status(200).json({ message: "Updated Successfully" });
    }
  } else {
    return res.status(400).json({ message: "User not found" });
  }
});

router.get("/search", async (req, res) => {
  const findUser = req.query.filter;
  const users = await User.find({
    $or: [
      { firstName: { $regex: findUser, $options: "i" } },
      { lastName: { $regex: findUser, $options: "i" } },
    ],
  });
  if (users) {
    return res.status(200).json(
      users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      }))
    );
  } else {
    return res.status(404).json({ message: "User Not Found" });
  }
});

module.exports = router;
