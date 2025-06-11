const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
	const authToken = req.headers["authorization"];
	const token = authToken && authToken.split(' ')[1];
	if (!token)
		return res.status(401).json({ QueryDone: false });
	jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
		if (err)
			return res.status(401).json({ QueryDone: false });
		req.data = data;
		next();
	})
}

module.exports = { AuthMiddleware };