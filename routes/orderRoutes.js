const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

const auth = require('../auth');


router.post('/add-product', auth.verify, (req, res) => {
  let access = auth.decode(req.headers.authorization);

 if (access.isAdmin == true) {
   console.log('for non admin users only');
   res.send(false);
 } 
  else {
    orderController
      .addProductToCart(req.body._id,access.id)
       .then((result) => res.send(result));
  }
});


module.exports = router;