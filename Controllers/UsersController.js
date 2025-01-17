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
			return res.json({ msg: "Created Successfully !" });
		}
		return res.json({ msg: "incomplete data" }).status(500);
	}
	catch (err) {
		console.log(err);
		return res.json({ msg: "Something Went Wrong !" }).status(500);
	}
}

const Login = async (req, res) => {
	const {
		email, password
	} = req.body;
	if (email, password) {
		const UserExists = await User.findOne({ email });
		if (UserExists) {
			if (ComparePassword(password, UserExists.password));
		}
	}
}

module.exports = { Signup };