const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema(
  {
  totalAmount:{type:Number},
  purchasedOn:{type:Date, required:[true, "Last name is required"],default: new Date()},
  status:{type:Boolean, default: false},
  associations:[
      {
        userId:{
                  type:String,
        },
        productId:
                  [String]
      }
    ]
  }
)

module.exports = mongoose.model("Order", orderSchema)