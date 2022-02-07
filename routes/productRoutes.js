const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const auth = require('../auth');

//retrieve all products
router.get('/all', auth.verify, (req, res) => {

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

//update product

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


//get specific product
router.get('/:productId', auth.verify,(req,res)=>{

  let productId = req.params.productId

  console.log(productId)
    productController
      .getSpecificProduct(productId)
      .then((result)=> res.send(result))
})


// archive product
router.put('/:productId/archive', auth.verify, (req, res) => {
 
  let access = auth.decode(req.headers.authorization);

  let productId = req.params.productId

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
   //  productController
   //    .archiveProduct(productId, req.body)
   //    .then((result) => res.send(result));
  }
 
});












//retrieving only active courses
router.get('/active-courses', auth.verify, (req, res) => {
  //console.log('active')
  courseController.getActiveCourses().then((result) => res.send(result));
});

//get a specific course using findOne()
router.get('/:courseName/specific-course', auth.verify, (req, res) => {
  courseController
    .getSpecificCourse(req.params.courseName)
    .then((result) => res.send(result));
});



router.get('/:courseId', auth.verify, (req, res) => {
  let paramsId = req.params.courseId;

  courseController.getCourseById(paramsId).then((result) => res.send(result));
});

module.exports = router;
