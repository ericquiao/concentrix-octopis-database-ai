const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
	UID : {
		type : String,
		required : [true, "UID is required"]
	},
	CITY_NAME : {
		type : String,
		required : [true, "CITYNAME is required"]
	},

})

module.exports = mongoose.model("City", citySchema);
//module.exports allows us to use the file as a module, similar to packages, and can be used by other files