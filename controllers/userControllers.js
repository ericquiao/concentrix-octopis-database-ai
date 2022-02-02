//Business logic including model methods

const User = require("../models/User");
const auth = require("./../auth")

const bcrypt = require('bcrypt');

module.exports.checkEmail = (email) => {
  return User.findOne({ email: email }).then((result, error) => {
   // console.log(result);
    if (result != null) {
      return false;
    } else {
      if (result == null) {
        return true;
      } else {
        return error;
      }
    }
  });
};

module.exports.register = (reqBody) => {
  const { firstName, lastName, email, password, mobileNo, age } = reqBody;
   //console.log(firstName)

  const newUser = new User({
     firstName: firstName,
     lastName: lastName,
     email: email,
     password: bcrypt.hashSync(password,10),
     mobileNo: mobileNo,
     age: age,
   });

   //save the newUser object to  the database
	return newUser.save().then( (result, error) => {
		//console.log(result)	//document
		if(result){
			return true
		} else {
			return error
		}
	})
};

module.exports.getAllUsers = () => {
return  User.find().then((result,error)=>{
    if(result !== null){
      return result
    }else{
      return error
    }
  })
}

module.exports.login = (reqBody) => {
  const {email,password} = reqBody
  return User.findOne({email: email}).then((result,error)=>{
   

    if(result == null){
      console.log('email null');
      return false
    } else {
      
      let isPwCorrect = bcrypt.compareSync(password, result.password)
      //return json web token;
        //invoke the fuction which creates the token upon logging in
        // requirements for creating a token:
          //if password matches from existing pw from db
        if(isPwCorrect == true){
        return {access:auth.createAccessToken(result)}
      } else{
        return false
      }
    }
  })
}

module.exports.getUserProfile = (reqBody) => {
  return User.findById({_id: reqBody.id}).then(result =>{
    return result
  })
}

