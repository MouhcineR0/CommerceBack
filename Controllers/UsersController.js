const express = require("express");
const { ComparePassword, CryptPassword } = require("../utils/bcrypt");

// User Schema
const User = require("../database/Schemas/UserSchema");

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
					return res.json({
						user: {
							_id: UserExists._id,
							firstname: UserExists.firstname,
							lastname: UserExists.lastname,
							email: UserExists.email,
							country: UserExists.country,
							LastTwoNumbers: UserExists.tel.slice(UserExists.tel.length - 2, UserExists.tel.length),
							RefreshToken: "RefreshToken",
							AccessToken: "Bearer AccessToken", // let jwt until finish all necessarily things
							QueryDone: true
						},
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

const EditUserGenetalInfos = async (req, res) => {
	const {
		firstname, lastname, tel, country
	} = req.body;
	const { id } = req.params;
	// admin or client middleware auth
	try {
		await User.findOneAndUpdate({ _id },
			{
				firstname,
				lastname,
				country,
				tel
			})
		return res.json({ msg: "User Deleted !!", QueryDone: true });
	}
	catch {
		return res.json({ msg: "Error Edtiting user", QueryDone: true });
	}
}

module.exports = { Signup, Login, DelUser, EditUserGenetalInfos };