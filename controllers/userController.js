const User = require('../models/User')
const auth = require("../auth")
const Course = require('../models/Product');
const bcrypt = require('bcrypt');


module.exports.register = (reqBody) => {
  const { email, password, adminKey } = reqBody;
   
  return User.findOne({email}).then((result,error)=>{
    if(error){
      return error
    } else if(result !== null){
      return ('email already used! please try again')
    } else {
      
      console.log(adminKey)

      let isAdmin = adminKey ? true : false;

      let accessStatus = isAdmin? 'Admin': 'User only'
  
      const newUser = new User({
        email: email,
        password: bcrypt.hashSync(password,10),
        isAdmin: isAdmin
      });
   
     return newUser.save().then( (result, error) => {
       if(result){
         console.log(`${accessStatus} registration successful`)
         return true
       } else {
         return error
       }
     })
     }
  })
};

module.exports.login = (reqBody) => {
  const {email,password} = reqBody

  return User.findOne({email: email}).then((result,error)=>{

    if(result == null){
      console.log('not authenticated');
      return false
    } 
    else {
      
      let isPwCorrect = bcrypt.compareSync(password, result.password)
        
        if(isPwCorrect == true){
        console.log('authentication success')
        return {access:auth.createAccessToken(result)}
      } else{
        console.log('not authenticated')
        return false
      }
    }

  })
}

module.exports.setToAdmin = (update)=> {
 
  const {_id,isAdmin} = update

  console.log(_id)
  console.log(isAdmin)

  const updatedUser = {isAdmin:true}

    User.findByIdAndUpdate(_id, updatedUser, {new:true}).
        then((result) => {

        console.log(result)
    //   const {email} = result
    //  console.log(`${email} set as admin`)
    //   return true 
     })
      
}


module.exports.getAllUsers = () => {
  return  User.find().then((result,error)=>{
      if(result !== null){
        return result
      }else{
        return error
      }
    })
  }

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

  Course.findOne({courseId}).then(result => {
    
    console.log(result.courseName)
    console.log(result.enrollees)

  
  })


	//look for matching document of a user
	const userEnroll = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {
    //  console.log(result)
			result.enrollments.push({courseId: courseId})
    // console.log(result)
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

