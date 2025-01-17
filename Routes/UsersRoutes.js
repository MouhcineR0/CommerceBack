const express = require("express");
const Router = express.Router();
const { Signup } = require("../Controllers/UsersController");


Router.route("/signup").post(Signup);

module.exports = Router;