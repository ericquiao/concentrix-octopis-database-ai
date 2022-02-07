// const mongoose = require('mongoose')
// const userSchema = new mongoose.Schema(
//   {firstName:{type:String, required:[true, "First name is required"]},
//   lastName:{type:String, required:[true, "Last name is required"]},
//   email:{type:String, required:[true, "Email number is required"]},
//   password:{type:String, required:[true, "Password number is required"]},
//   isAdmin:{type:Boolean, default: false},
//   orders:[
//       {
//         productId:{
//                   type:String,
//                   required:[true, "Product Id is required"]
//         },
//         DateOfOrder:{
//                   type:Date,
//                   required:[true, "Date is required"],
//                   default: new Date()
//         },
//         status:{
//           type:String,
//           default: "For Packing"
//         }
//       }
//     ]
//   }
// )

// module.exports = mongoose.model("User", userSchema)


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : { 
		type : Boolean,
		default : false 
	},
	orders : [ 
		{
			products : [
				{
					productName : {
						type: String,
						required : [true, "Product name is required"]
					},
					quantity : {
						type: Number,
						required : [true, "Product quantity is required"]
					}
				}
			],
			totalAmount : {
				type: Number,
				required : [true, "Total amount is required"]
			},
			purchasedOn : {
				type : Date,
				default : new Date()
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);
//module.exports allows us to use the file as a module, similar to packages, and can be used by other files