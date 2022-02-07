// const mongoose = require('mongoose');
// const productSchema = new mongoose.Schema({
//   productName: {
//     type: String,
//     required: [true, 'Product name is required'],
//   },
//   description: {
//     type: String,
//     required: [true, 'Product description is required'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Product price is required'],
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
//   createdOn: {
//     type: Date,
//     default: new Date(),
//   },
//   buyers: [
//     {
//       userId: {
//         type: String,
//         required: [true, 'User ID is required'],
//       },
//       DateOfOrder: {
//         type: Date,
//         default: new Date(),
//       },
//     },
//   ],
// });

// module.exports = mongoose.model('Product', productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name : {
		type : String,
		required : [true, "Product name is required"]
	},
	description : {
		type : String,
		required : [true, "Product description is required"]
	},
	price : {
		type : Number,
		required : [true, "Product price is required"]
	},
	isActive : {
		type : Boolean,
		default : true
	},
	createdOn : {
		type : Date,
		default : new Date()
	},
	orders : [ 
		{
			orderId : {
				type : String,
				required: [true, "Order ID is required"]
			}
		}
	]
})

module.exports = mongoose.model("Product", productSchema);
