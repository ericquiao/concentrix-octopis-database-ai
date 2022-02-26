const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
	UID : {
		type : String,
		required : [true, "UID is required"]
	},
	SEVERITY : {
		type : String,
		required : [true, "SEVERITY is required"]
	},
	COUGH : {
		type : String,
		required : [true, "COUGH is required"]
	},
	COLD : {
		type : String,
		required : [true, "COLD is required"]
	},
	FEVER : {
		type : String,
		required : [true, "FEVER is required"]
	},

})

module.exports = mongoose.model("Status", statusSchema);
//module.exports allows us to use the file as a module, similar to packages, and can be used by other files