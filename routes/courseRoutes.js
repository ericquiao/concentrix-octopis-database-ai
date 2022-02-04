const express = require('express');
const router = express.Router();

const courseController = require('./../controllers/courseController');

const auth = require('./../auth');

//create a course
router.post('/create-course', auth.verify, (req, res) => {

   courseController.createCourse(req.body)
   .then((result) => res.send(result));
});

//retrieve all courses
router.get('/',auth.verify, (req, res) => {
  courseController.getAllCourses()
  .then((result) => res.send(result));
});

//retrieving only active courses
router.get('/active-courses', auth.verify,(req, res) => {
  
  //console.log('active')
  courseController.getActiveCourses()
  .then((result) => res.send(result));
});

//get a specific course using findOne()
router.get('/:courseName/specific-course',auth.verify, (req, res) => {

  courseController
    .getSpecificCourse(req.params.courseName)
   .then((result) => res.send(result));
});

router.get('/specific-course',auth.verify, (req, res) => {

  courseController
    .getSpecificCourse2(req.body.courseName)
    .then((result) => res.send(result));
});

router.get('/:courseId', auth.verify, (req,res)=>{
  let paramsId = req.params.courseId

  courseController.getCourseById(paramsId)
  .then(result => res.send(result))
})

module.exports = router;
