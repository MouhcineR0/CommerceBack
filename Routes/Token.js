const jwt = require("jsonwebtoken");
const { CreateToken } = require("../utils/jwt");

const RefreshToken = async (req, res) => {
	const refreshtok = req.cookies.refreshtoken;
	console.log(refreshtok);
	if (!refreshtok)
		return res.status(401).json({ QueryDone: false });
	jwt.verify(refreshtok, process.env.REFRESH_TOKEN, (err, data) => {
		if (err)
			return res.status(401).json({ QueryDone: false });
		const accesstoken = CreateToken("AccessToken", { data });
		return res.json({ accesstoken });
	})
}

module.exports = { RefreshToken };