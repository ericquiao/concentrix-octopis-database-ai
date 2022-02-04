//Business logic including model methods

const User = require("../models/User");
const auth = require("../auth")
const Course = require('../models/Course');

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

module.exports.editProfile = (userId, reqBody) => {
  // console.log(userId)
  // console.log(reqBody)
  return User.findByIdAndUpdate(userId, reqBody, {new:true}).then(result => {
    
    result.password = '*****'
    return result})
}

module.exports.editUser = (userId,reqBody) => {


  const {firstName, lastName, email, password, mobileNo, age} = reqBody

  
  const updatedUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNo: mobileNo,
    password: bcrypt.hashSync(password, 10),
    age: age
  }
  return User.findByIdAndUpdate(userId, updatedUser, {new:true}).
    then(result =>{
    result.password = "****"
    return result
  })

  //console.log(firstName)
}

module.exports.editDetails = (reqBody) => {
 // console.log(userId)
 // console.log(reqBody)
  const {firstName, lastName, email, password, mobileNo, age} = reqBody

  const updatedUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    mobileNo: mobileNo,
    password: bcrypt.hashSync(password, 10),
    age: age
  }


   return User.findOneAndUpdate({email: email}, updatedUser, {returnDocument:'before'}).
     then(result =>{
      return (result)
   })

  //console.log(firstName)
}

module.exports.deleteUser = (userId) => {
  //console.log(userId)
  return User.findByIdAndDelete(userId).then(result => {
    
    return result})
}

module.exports.deleteUserByFindOneandDelete = (email) => {
  //console.log(email)
  return User.findOneAndDelete(email).then(result =>{
    return true
  })
}

//Enroll
module.exports.enroll = async (data) => {
	const {userId, courseId} = data


	//look for matching document of a user
	const userEnroll = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {
    //  console.log(result)
			result.enrollments.push({courseId: courseId})
     console.log(result)
			return  result.save().then(() => true)
		}

	})

	//look for matching document of a user
	const courseEnroll = await Course.findById(courseId).then( (result, err) => {
		if(err){
			return err
		} else {

			result.enrollees.push({userId: userId})

			return result.save().then(() => true)
		}
	})

	//to return only one value for the function enroll

	if(userEnroll && courseEnroll){
		return true
	} else {
		return false
	}
}