const Street = require('../models/Street');


// Register a User
module.exports.registerStreet = (reqBody) => {
  const { UID, STREET_NAME, CITY_ID } = reqBody;

  return Street.findOne({ STREET_NAME }).then((result, error) => {
    if (error) {
      return error;
    } else if (result !== null) {
      return 'name already used! please try again';
    } else {


      const newStreet = new Street({
        UID:UID,
        STREET_NAME:STREET_NAME,
        CITY_ID:CITY_ID
      });

      return newStreet.save().then((result, error) => {
        if (result) {
          console.log(`Street registration successful`);
          return true;
        } else {
          return error;
        }
      });
    }
  });
};

module.exports.getAllStreets = () => {
  return Street.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};



































// Login/Authenticate a User
module.exports.login = (reqBody) => {
  const { email, password } = reqBody;

  return User.findOne({ email: email }).then((result, error) => {
    if (result == null) {
      console.log('not authenticated');
      return false;
    } else {
      let isPwCorrect = bcrypt.compareSync(password, result.password);

      if (isPwCorrect == true) {
        console.log('authentication success');
        return { access: auth.createAccessToken(result) };
      } else {
        console.log('not authenticated');
        return false;
      }
    }
  });
};

// Set user to admin by admin only
module.exports.setToAdmin = (userId) => {
  console.log(userId);

  const updatedUser = {
    isAdmin: true,
  };
  console.log(updatedUser);
  return User.findByIdAndUpdate({ _id: userId }, updatedUser, {
    new: true,
  }).then((result) => {
    console.log(result);
    if (result == null) {
      console.log('detected null');
      return result;
    }
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

// Get all Users by admin only
module.exports.getAllUsers = () => {
  return User.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

// Delete user
module.exports.deleteUser = (userId) => {
  console.log(userId);
  return User.findByIdAndDelete(userId).then((result) => {
    console.log(result);
    if (result == null) {
      console.log('detected null');
      return result;
    }
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

module.exports.getMyOrder = (userId) => {
  console.log(userId);

  return User.findOne({ _id: userId }).then((result, error) => {
    console.log(result.orders);
    if (result == null) {
      return 'user not existing';
    }
    if (result !== null) {
      return result.orders;
    } else {
      return error;
    }
  });
};

// all orders - admin only
module.exports.getAllOrders = () => {
  console.log('at productController');
  return User.find({}).then((result, error) => {
    const allOrders = result.map((user) => user.orders);

    console.log(allOrders);

    if (result !== null) {
      return allOrders;
    } else {
      return error;
    }
  });
};

module.exports.checkout = (userId, cart) => {

return User.findById(userId).then(user=>{
    if(user === null){
      return false
    }else{
      //push the contents of the cart to the user
    
      user.orders.push({
        products: cart.products,
        totalAmount: cart.totalAmount
      })
      return user.save().then((updatedUser, error)=>{
        if(error){
          return false
        }else{
            const currentOrder = updatedUser.orders[updatedUser.orders.length-1]
           // console.log(currentOrder)
           currentOrder.products.forEach((product)=>{
            
            Product.findById(product.productId)
            .then(foundProduct => {
              foundProduct.orders.push({orderId:currentOrder._id})
              foundProduct.save()
            })
           })
           return true;
        }
      })
    }
  })
}


// module.exports.checkoutB = (userId, cart) => {

//   return User.findById(userId).then(user=>{
//       if(user === null){
//         return false
//       }else{
//         //push the contents of the cart to the user
      
//         user.orders.push({
//           products: cart.products,
//           totalAmount: cart.totalAmount
//         })
//         return user.save().then((updatedUser, error)=>{
//           if(error){
//             return false
//           }else{
//               const currentOrder = updatedUser.orders[updatedUser.orders.length-1]
//              // console.log(currentOrder)
//              for (let i = 0; i < updatedUser.orders.length; i++) {
              

//             // Product.findById(updatedUser.orders[i]._id)
//             // .then(foundProduct => {
//             //   foundProduct.orders.push({orderId:currentOrder._id})
//             //   foundProduct.save()
              
//             // })
              
//              }
//              return true;
          
//           }
//         })
//       }
//     })
//   }