const bcrypt = require("bcrypt");

const salt = 10; // defualt

const CryptPassword = (password) => {
	try {
		return bcrypt.hashSync(password, salt);
	}
	catch {
		return false;
	}
}

const ComparePassword = (password, hash) => {
	try {
		return bcrypt.compareSync(password, hash);
	}
	catch {
		return false;
	}
}

module.exports = { CryptPassword, ComparePassword };