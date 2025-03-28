const express = require("express");
const Router = express.Router();
const {
	Signup,
	DelUser,
	EditUserGenetalInfos,
	Login,
	GetUsers
} = require("../Controllers/UsersController");


Router.get("/users", GetUsers);
Router.post("/client/signup", Signup);
Router.post("/client/login", Login);
Router.delete("/client/deluser", DelUser);
Router.patch("/client/edit-general-infos/:id", EditUserGenetalInfos);

module.exports = Router;