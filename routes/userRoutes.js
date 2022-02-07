const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const auth = require('./../auth');

// Register a User
router.post('/register', (req, res) => {
  console.log(req.body);
  userController.register(req.body).then((result) => res.send(result));
});

// Login a User
router.post('/login', (req, res) => {
  userController
    .login(req.body)

    .then((result) => res.send(result));
});

// Is admin

router.put('/setAsAdmin', auth.verify, (req, res) => {

  let access = auth.decode(req.headers.authorization);

  console.log(req.body)
  
  console.log(access)
 if(access.isAdmin == false){
    console.log('not an admin')
    res.send(false)
  }
   else{
     
   userController.setToAdmin(req.body)
 // .then((result)=>res.send(result))
 }

});

// Get all User
router.get('/all', (req, res) => {
  userController.getAllUsers().then((result) => res.send(result));
});





router.get('/details', auth.verify, (req, res) => {
  //console.log(req.headers.authorization);

  //console.log(auth.decode(req.headers.authorization))

  let userData = auth.decode(req.headers.authorization);

  //console.log(userData)

  userController.getUserProfile(userData).then((result) => res.send(result));
});

router.put('/:userId/edit', (req, res) => {
  // console.log(req.params)
  //console.log(req.body)
  const userId = req.params.userId;
  const reqBody = req.body;
  userController
    .editProfile(userId, reqBody)
    .then((result) => res.send(result));
});

router.put('/edit', auth.verify, (req, res) => {
  // console.log(req.headers.authorization)
  //  console.log(auth.decode(req.headers.authorization).id)
  let userId = auth.decode(req.headers.authorization).id;
  //console.log(payload.id)
  userController.editUser(userId, req.body).then((result) => res.send(result));
});


router.put('/edit-profile', (req, res) => {
  console.log(req.body);
  userController.editDetails(req.body).then((result) => {
    res.send(result);
  });
});

router.delete('/:userId/delete', (req, res) => {
  //console.log(req.params)
  userController
    .deleteUser(req.params.userId)
    .then((result) => res.send(`You have deleted id# ${result.id}`));
});

router.delete('/delete', (req, res) => {
  //console.log(req.body.email)
  userController
    .deleteUserByFindOneandDelete(req.body.email)

    .then((result) => res.send(result));
});

router.post('/enroll', auth.verify, (req, res) => {
  let data = {
    userId: auth.decode(req.headers.authorization).id,
    courseId: req.body.courseId,
  };

  userController.enroll(data).then((result) => res.send(result));
});

router.post('/email-exists', (req, res) => {
  //invoke the function here
  userController.checkEmail(req.body.email).then((result) => res.send(result));
});

module.exports = router;
