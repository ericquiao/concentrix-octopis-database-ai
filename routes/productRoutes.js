const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const auth = require('../auth');

//retrieve all products
router.get('/', auth.verify, (req, res) => {

  try{  
  
   productController.getAllProducts()
   .then((result) => res.send(result));
  }catch(err){
    console.error(err)
  }

});

// Get all active Products
router.get('/active', auth.verify, (req, res) => {
  //console.log('active')
  productController.getAllActive().then((result) => res.send(result));
});

//update product admin only
router.put('/:productId', auth.verify, (req, res) => {
 
  let access = auth.decode(req.headers.authorization);

  let productId = req.params.productId

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
     productController
       .updateInformation(productId, req.body)
       .then((result) => res.send(result));
  }
 
});

//add product admin only
router.post('/', auth.verify, (req, res) => {
  let access = auth.decode(req.headers.authorization);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
    console.log('this is admin')
    productController 
      .addProduct(req.body)
      .then((result) => res.send(result));
  }
});

//get specific product
router.get('/:productId', auth.verify,(req,res)=>{

  let access = auth.decode(req.headers.authorization);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send('not an admin');
  } else {

  let productId = req.params.productId
  console.log(productId)
    productController
      .getSpecificProduct(productId)
      .then((result)=> res.send(result))
  }
})

// archive product admin only
router.put('/:productId/archive', auth.verify, (req, res) => {
 
  let access = auth.decode(req.headers.authorization);

  let productId = req.params.productId

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send('not an admin');
  } else {
    console.log('admin account')
     productController
       .archiveProduct(productId)
       .then((result) => res.send(`${result._id} archived`));
  }
 
});

// activate product admin only
router.put('/:productId/activate', auth.verify, (req, res) => {
 
  let access = auth.decode(req.headers.authorization);

  let productId = req.params.productId

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send('not an admin');
  } else {
    console.log('admin account')
     productController
       .activateProduct(productId)
       .then((result) => res.send(`${result._id} activated`));
  }
 
});




module.exports = router;
