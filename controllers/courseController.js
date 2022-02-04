const Course = require('../models/Course');
const auth = require('./../auth');

const bcrypt = require('bcrypt');

module.exports.createCourse = (reqBody) => {
  const { courseName, description, price, isActive, createdOn, enrollees } = reqBody;
   //console.log(firstName)
  

   
  const newCourse = new Course({
     courseName: courseName,
     description: description,
     price: price,
     isActive: isActive,
     createdOn: createdOn,
     enrollees: enrollees

   });

	return newCourse.save().then( (result, error) => {
		//console.log(result)	//document
		if(result){
			return true
		} else {
			return error
		}
	})
};

module.exports.getAllCourses = () => {
 
  return Course.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

module.exports.getActiveCourses = () => {

  return Course.find({isActive:true}).then((result, error) => {

   // console.log(result)
    if (result !== null) {
      return result;
    } else {
      return error;
    }
   });
};

module.exports.getSpecificCourse = (course) => {
  
  return Course.find({courseName:course}).then((result, error) => {
    if(result == null){
    return ('course not existing')
    }
    if (result !== null) {
      return result;
    } else {
      return error;
   }
   });
};

module.exports.getSpecificCourse2 = (course) => {

  return Course.findOne({courseName:course}).then((result, error) => {
    if(result == null){
      return ('course not existing')
    }

    if (result !== null) {
      return result;
    } else {
      return error;
   }
   });
}

 
module.exports.getCourseById = (courseId) => {
  return Course.findById({_id:courseId}).then(
    (result,error) => {
      if(result == null){
        return ('id not existing')
      }
      if (result !== null) {
        return result;
      } else {
        return error;
      }
    });
 }