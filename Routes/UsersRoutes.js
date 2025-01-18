const express = require("express");
const Router = express.Router();
const {
	Signup,
	DelUser,
	EditUserGenetalInfos,
	Login
} = require("../Controllers/UsersController");


Router.post("/client/signup", Signup);
Router.post("/client/login", Login);
Router.delete("/client/deluser", DelUser);
Router.patch("/client/edit-general-infos/:id", EditUserGenetalInfos);

module.exports = Router;