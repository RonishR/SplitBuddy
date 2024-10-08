const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const routerRoot = require("./routes/index");

app.use("/api/v1", routerRoot);

app.listen(3000);
