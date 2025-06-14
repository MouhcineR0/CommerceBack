const express = require("express");
const { ComparePassword, CryptPassword } = require("../utils/bcrypt");

// User Schema
const User = require("../database/Schemas/UserSchema");
const { CreateToken } = require("../utils/jwt");

const Signup = async (req, res) => {
	const {
		firstname, lastname, email, password, tel, country
	} = req.body;
	try {
		if (firstname && lastname && email && password && tel && country) {
			const CryptedPassword = CryptPassword(password);
			const query = new User({
				firstname,
				lastname,
				email,
				password: CryptedPassword,
				tel,
				country
			})
			await query.save();
			return res.json({ msg: "Created Successfully !", QueryDone: true });
		}
		return res.json({ msg: "incomplete data", QueryDone: false }).status(400);
	}
	catch (err) {
		console.log(err);
		return res.json({ msg: "Something Went Wrong !", QueryDone: false }).status(400);
	}
}

const Login = async (req, res) => {
	const {
		email, password
	} = req.body;
	try {
		if (email && password) {
			const UserExists = await User.findOne({ email });
			if (UserExists) {
				if (ComparePassword(password, UserExists.password)) {
					ACCESS = "Bearer " + CreateToken("AccessToken", { UserExists });
					REFRESH = CreateToken("RefreshToken", { UserExists });
					res.cookie('refreshtoken', REFRESH, {
						httpOnly: true,
						secure: process.env.NODE_ENV == 'development' ? false : true,
						// sameSite: 'Strict',
						// path: '/api/refresh',
						maxAge: 14 * 24 * 60 * 60 * 1000,
					})
					return res.json({
						user: {
							_id: UserExists._id,
							firstname: UserExists.firstname,
							lastname: UserExists.lastname,
							email: UserExists.email,
							country: UserExists.country,
							LastTwoNumbers: UserExists.tel.slice(UserExists.tel.length - 2, UserExists.tel.length),
							RefreshToken: ACCESS, // warning here should switch
							AccessToken: REFRESH, // let jwt until finish all necessarily things
						},
						QueryDone: true
					});
				}
				return res.json({
					msg: "Incorrect Password",
					QueryDone: false
				}).status(400);
			}
			return res.json({
				msg: "Incorrect Password",
				QueryDone: false
			}).status(400);
		}
	}
	catch (err) {
		console.log(err);
		return res.json({ msg: "Sonething went wrong !", QueryDone: false });
	}
	return res.json({ msg: "Sonething went wrong !", QueryDone: false });
}

const Logout = (req, res) => {
	res.clearCookie('refreshtoken');
	// 204 means return success but there is no content to return
	return res.status(200).json({ QueryDone: true });
}

const EditUserGenetalInfos = async (req, res) => {
	const {
		firstname, lastname, tel, country
	} = req.body;
	const { id } = req.params;
	console.log(typeof (id));
	// admin or client middleware auth
	if (id) {
		try {
			await User.findOneAndUpdate({ _id: id },
				{
					$set: {
						firstname,
						lastname,
						country,
						tel
					}
				},
				{
					runValidators: true // use Schema validation middleware 
				}
			)
			return res.json({ msg: "User Edited !!", QueryDone: true });
		}
		catch {
			return res.json({ msg: "Error Edtiting user", QueryDone: false });
		}
	}
	return res.json({ msg: "Error Edtiting user", QueryDone: false }).status(400);
}

const DelUser = async (req, res) => {
	const { _id } = req.body;
	const token = req.headers.authorization.split(' ')[1];
	try {
		if (req.headers.authorization.split(' ')[0] == "Bearer" && token) {
			// verify with jwt token verify also that he is an admin role
			// instead of this we can just use admin middleware
			await User.findOneAndDelete({ _id });
			return res.json({ msg: "User Deleted", QueryDone: true });
		}
		return res.json({ msg: "Authentification Error", QueryDone: true });
	}
	catch {
		return res.json({ msg: "Something Went Wrong !", QueryDone: false }).status(400);
	}
}

const GetUsers = async (req, res) => {
	try {
		const Users = await User.find({});
		return res.json(Users);
	}
	catch {
		return res.json({ msg: "Something Went Wrong !", QueryDone: false }).status(400);
	}
}

module.exports = { Signup, Login, Logout, DelUser, EditUserGenetalInfos, GetUsers };