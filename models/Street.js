const mongoose = require("mongoose");

const streetSchema = new mongoose.Schema({
	UID : {
		type : String,
		required : [true, "UID is required"]
	},
	STREET_NAME : {
		type : String,
		required : [true, "STREETNAME is required"]
	},
	CITY_ID : {
		type : String,
		required : [true, "CITYID is required"]
	},

	
})

module.exports = mongoose.model("Street", streetSchema);
//module.exports allows us to use the file as a module, similar to packages, and can be used by other files