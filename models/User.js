const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {firstName:{type:String, required:[true, "First name is required"]},
  lastName:{type:String, required:[true, "Last name is required"]},
  email:{type:String, required:[true, "Email number is required"]},
  password:{type:String, required:[true, "Password number is required"]},
  mobileNo:{type:String, required:[true, 'Mobile number is required']},
  age:{type:Number, required:[false, "Age is optional"]},
  isAdmin:{type:Boolean, default: false},
    enrollments:[
      {
        courseId:{
                  type:String,
                  required:[true, "Course ID is required"]
        },
        enrolledOn:{
                  type:Date,
                  required:[true, "Date is requierd"]
        },
        status:{
          type:String,
          default: "Enrolled"
        }
      }
    ]
  }
)

module.exports = mongoose.model("User", userSchema)