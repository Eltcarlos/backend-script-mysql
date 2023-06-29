const express = require("express");
const User = require("./Users");

const RouterMain = express.Router();

RouterMain.use("/api/user", User);

module.exports = RouterMain;
