const express = require("express");
const User = require("../database/Schemas/UserSchema");

const Signup = async (req, res) => {
	const {
		firstname, lastname, email, password, tel, country
	} = req.body;
	try {
		if (!firstname || !lastname || !email || !password || !tel || !country)
			return res.json({ msg: "incomplete data" }).status(500);
		const query = new User({
			firstname,
			lastname,
			email,
			password,
			tel,
			country
		})
		await query.save();
		return res.json({ msg: "Created Successfully !" });

	}
	catch (err) {
		console.log(err);
		return res.json({ msg: "Something Went Wrong !" }).status(500);
	}
}

module.exports = { Signup };