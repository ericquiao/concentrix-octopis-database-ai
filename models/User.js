const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	UID : {
		type : String,
		required : [true, "UID is required"]
	},
	NAME : {
		type : String,
		required : [true, "NAME is required"]
	},
	STREET_ID : {
		type : String,
		required : [true, "STREETID is required"]
	},
	BIRTHDAY : {
		type : String,
		required : [true, "BIRTHDAY is required"]
	},
	HEALTH_STATUS_ID : {
		type : String,
		required : [true, "HEALTHSTATUS is required"]
	},

	
})

module.exports = mongoose.model("User", userSchema);
//module.exports allows us to use the file as a module, similar to packages, and can be used by other files