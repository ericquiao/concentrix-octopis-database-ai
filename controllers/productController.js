const Product = require('../models/Product');
const auth = require('./../auth');

const bcrypt = require('bcrypt');




//retrieve all products
module.exports.getAllProducts = () => {
 
  return Product.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

// Get all active Products
module.exports.getAllActive = () => {
  return Product.find({isActive:true}).then((result, error) => {

   // console.log(result)
    if (result !== null) {
      return result;
    } else {
      return error;
    }
   });
};

//update product admin only
module.exports.updateInformation = (productId, reqBody) => {


   const {name, description, price, isActive} = reqBody

   const updatedProduct = {
     name:name,
     description:description,
     price:price,
     isActive:isActive
   
  }
  return Product.findByIdAndUpdate(productId, updatedProduct, {new:true}).
    then(result =>{
    return result
  })

 }

//add product admin only
module.exports.addProduct= (reqBody) => {
  const { name, description, price, isActive, createdOn } = reqBody;
  
   return Product.findOne({name}).then((result,error)=>{
    
        if(error){
      return error
    } else if(result){
      return ('cannot add existing product')
    } else{
      const newProduct = new Product({
        name: name,
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

//get specific product
module.exports.getSpecificProduct = (id) => {

return Product.findOne({_id:id}).then((result, error) => {
    console.log(result)
     if(result == null){
     return ('product not existing')
     }
     if (result !== null) { 
       return result;
     } else {
       return error;
    }
   });
};

// archive product admin only
module.exports.archiveProduct = (productId) => {

    console.log(productId)

  const updatedProduct = {
    isActive:false
  }
  
 return Product.findByIdAndUpdate(productId, updatedProduct, {new:true}).
   then(result =>{

   return result
 })

}

// activate product admin only
module.exports.activateProduct = (productId) => {

  console.log(productId)

const updatedProduct = {
  isActive:true
}
console.log(updatedProduct)
return Product.findByIdAndUpdate(productId, updatedProduct, {new:true}).then((result) =>{

 return result
})

}



