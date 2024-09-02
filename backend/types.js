const zod = require("zod");

const passwordSchema = zod
  .string()
  .min(8, { message: "length should be a min of 8" })
  .max(20, { message: "length should be a max of 20" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "should contain atleast 1 uppercase",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "should contai atleast 1 lowercase",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "should contain atleast 1 number",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "should contai atlaest 1 special character",
  });

const UserSchema = zod.object({
  username: zod.string().min(1),
  password: passwordSchema,
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
});

const UpdateSchema = zod.object({
  username: zod.string().min(1).optional(),
  password: passwordSchema.optional(),
  firstName: zod.string().min(1).optional(),
  lastName: zod.string().min(1).optional(),
});

module.exports = {
  UserSchema,
  UpdateSchema,
};
