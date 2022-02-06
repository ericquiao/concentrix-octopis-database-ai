const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

const auth = require('../auth');

//create product admin only
router.post('/create-product', auth.verify, (req, res) => {
  let access = auth.decode(req.headers.authorization);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
    productController
      .createProduct(req.body)
      .then((result) => res.send(result));
  }
});

//retrieve all products
router.get('/', auth.verify, (req, res) => {
  
   productController.getAllProducts()
  .then((result) => res.send(result));
});


router.get('/specific-product', auth.verify, (req, res) => {

  productController
    .getSpecificProduct(req.body.productName)
     .then((result) => res.send(result));
});






























router.put('/update-info', auth.verify, (req, res) => {
 
  let access = auth.decode(req.headers.authorization);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
     productController
       .updateInformation(req.body)
       .then((result) => res.send(result));
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
