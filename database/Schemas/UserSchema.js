const mongoose = require("mongoose");

const country = require("../../json/country.json");

// console.log(country);

const UserSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minlength: 2,
		maxlength: 20
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minlength: 2,
		maxlength: 20
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		index: true,
		index: true,
		immutable: true, // cant change it
		validate: {
			validator: (val) => {
				return /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(val); // simple regxp for email
			},
			message: ({ value }) => `${value} is not a valid email`
		}
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: (val) => {
				return /^[a-zA-Zrachid !@#$%^&*0-9]{8,}$/.test(val);
			},
			message: ({ value }) => `${value} is not a valid password`
		}
	},
	tel: {
		type: String,
		required: true,
		unique: false, // set to true if it needs
		trim: true,
		validate: {
			validator: function (val) {
				const TargetCountry = country.find((ele, index) => {
					return ele.phone == val.slice(0, 4); // +212
				})
				if (!TargetCountry) return false;
				console.log(`<<<<<<<<<<<<<<<<<<<<<<<<<${TargetCountry.name}`);
				const regexp = new RegExp(`^\\+${TargetCountry.phone}\\s{1}\\d{${TargetCountry.phoneLength}}$`)
				return regexp.test(val);
			},
			message: ({ value }) => `${value} is not valid phone number` // https://stackoverflow.com/questions/63098294/validation-in-mongoose-schema
		}
	},
	role: { // available roles : client, admin
		type: String,
		default: "client",
		enum: ["client", "admin"]
	},
	country: {
		type: String,
		required: true,
		validate: {
			validator: (val) => {
				return country.find((ele) => ele.name == val)
			},
			message: ({ value }) => `${value} is not a valid country`
		}
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
})

module.exports = mongoose.model("User", UserSchema);