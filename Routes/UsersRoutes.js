const express = require("express");
const Router = express.Router();
const {
	Signup,
	DelUser,
	EditUserGenetalInfos,
	Login,
	GetUsers,
	Logout
} = require("../Controllers/UsersController");
const { AuthMiddleware } = require("../Middlewares/Auth");
const { RefreshToken } = require("./Token");


Router.get("/users", AuthMiddleware, GetUsers);
Router.post("/client/signup", Signup);
Router.post("/client/login", Login);
Router.post("/client/logout", AuthMiddleware, Logout);
Router.delete("/client/deluser", AuthMiddleware, DelUser);
Router.patch("/client/edit-general-infos/:id", AuthMiddleware, EditUserGenetalInfos);

// token refresh
Router.post("/refresh", RefreshToken);


module.exports = Router;