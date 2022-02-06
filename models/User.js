const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {firstName:{type:String, required:[true, "First name is required"]},
  lastName:{type:String, required:[true, "Last name is required"]},
  email:{type:String, required:[true, "Email number is required"]},
  password:{type:String, required:[true, "Password number is required"]},
  isAdmin:{type:Boolean, default: false},
  orders:[
      {
        productId:{
                  type:String,
                  required:[true, "Product Id is required"]
        },
        DateOfOrder:{
                  type:Date,
                  required:[true, "Date is required"],
                  default: new Date()
        },
        status:{
          type:String,
          default: "For Packing"
        }
      }
    ]
  }
)

module.exports = mongoose.model("User", userSchema)