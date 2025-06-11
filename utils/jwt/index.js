const jwt = require("jsonwebtoken");

const CreateToken = (type, data) => {
	if (type == "AccessToken")
		return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: '15min' });
	return jwt.sign(data, process.env.REFRESH_TOKEN, { expiresIn: '14d' });
}

module.exports = { CreateToken };