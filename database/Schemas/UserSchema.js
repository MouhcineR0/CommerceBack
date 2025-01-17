const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstname : {
		type : String,
		required : true,
		trim : true,
		lowercase : true
	},
	lastname : {
		type : String,
		required : true,
		trim : true,
		lowercase : true
	},
	email : {
		type : String,
		required : true,
		unique : true,
		trim : true,
		lowercase : true,
		index : true,
		immutable : true
	},
	password : {
		type : String,
		required : true
	},
	tel : {
		type : String,
		required : true,
		unique : false, // set to true if it needs
		trim : true,
		validate : {
			validator : function (val) {
				return /^\d+$/.test(val);
			},
			message : props => `${props.value} is not valid phone number` // https://stackoverflow.com/questions/63098294/validation-in-mongoose-schema
		}
	},
	role : { // available roles : client, admin
		type : String,
		default : "client",
		enum : ["client", "admin"]

	},
	country : {
		type : mongoose.Schema.Types.ObjectId,
		ref : "Countries"
	},
	created_at : {
		type : Date,
		default : Date.now()
	}
})

module.exports = mongoose.model("User",UserSchema);