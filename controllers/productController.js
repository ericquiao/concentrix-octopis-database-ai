const Product = require('../models/Product');
const auth = require('./../auth');

const bcrypt = require('bcrypt');


module.exports.createProduct= (reqBody) => {
  const { productName, description, price, isActive, createdOn } = reqBody;
  
  
   return Product.findOne({productName}).then((result,error)=>{
    
      if(error){
      return error
    } else if(result){
      return ('product existing')
    } else{
      const newProduct = new Product({
        productName: productName,
        description: description,
        price: price,
        isActive: isActive,
        createdOn: createdOn
      });
      console.log(newProduct)
     return newProduct.save().then( (result, error) => {
       if(result){
         console.log('reached save true')
         return true
       } 
        else {
        return error
       }
     })
    }
  })
};

module.exports.getAllProducts = () => {
 
  return Product.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

module.exports.getSpecificProduct = (productName) => {
  
  return Product.find({productName}).then((result, error) => {
    
    if(result == null){
    return false
    }
    if (result !== null) { 
      return result;
    } else {
      return error;
   }
   });
};

module.exports.updateInformation = (reqBody) => {


  const {_id, productName, description, price, isActive} = reqBody

  console.log(_id)
  console.log(isActive)

  const updatedProduct = {
    productName:productName,
    description:description,
    price:price,
    isActive:isActive
   
  }
  return Product.findByIdAndUpdate(_id, updatedProduct, {new:true}).
    then(result =>{
    return result
  })

}




















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