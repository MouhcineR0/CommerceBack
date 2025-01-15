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
	tel : {
		type : String,
		required : true,
		unique : false, // set to true if it needs
		trim : true,
		validate : {
			validator : function (val) {
				return 
			}
		}
	}
})