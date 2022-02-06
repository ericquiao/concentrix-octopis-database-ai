const Order = require('../models/Order');
const Product = require('../models/Product')

const User = require('../models/User')

const auth = require('./../auth');
const bcrypt = require('bcrypt');

module.exports.addProductToCart = async (productId, userId) => {

 console.log(productId)
 console.log(userId)

	const userAdd = await User.findById(userId).then( (result, err) => {
		if(err){
			return err
		} else {

			result.orders.push({productId: productId})

      console.log(result)
			return  result.save().then(() => true)
		}

	})


	 const productAdd = await Product.findById(productId).then( (result, err) => {
    console.log(result)
		if(err){
			return err
		} 
  else {

			result.buyers.push({userId: userId})
      console.log(result)
			 return result.save().then(() => true)
		}
  })


	if(userAdd && productAdd){
		return true
	} else {
		return false
	}
  
}