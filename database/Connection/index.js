const mongoose = require("mongoose");

const ConnectionDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)
		console.log("DB connected !");
	}
	catch {
		console.log("Error Establishing Connection db !");
		process.exit(1);
	}
}

module.exports = ConnectionDB;