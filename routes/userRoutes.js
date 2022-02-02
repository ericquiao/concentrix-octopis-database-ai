const express = require("express");

const router = express.Router();

//User model
// const User = require('./../models/User')

//User Controller
const userController = require("./../controllers/userControllers");

const auth = require('./../auth')

//syntax: router.HTTPmethod()
// router.get('/',(req,res)=>{
//   console.log("hello from userRoutes")
//   res.send("Hello from userRoutes")
// })

// router.post('/email-exists', (req,res)=>{
//   let email = req.body.email
//   console.log(email)

//   User.findOne({email: email}).then((result,error)=>{
//     console.log(result)
//     if(result != null){
//       res.send(false)
//     }else{
//       if(result == null){
//         res.send(true)
//       }else{
//         res.send(error)
//       }
//     }
//   })
//   //send back the response to the client
// })

router.post("/email-exists", (req, res) => {
  //invoke the function here
  userController.checkEmail(req.body.email).then((result) => res.send(result));
});

// register route
router.post("/register", (req, res) => {
  userController.register(req.body).then((result) => res.send(result));
});

router.get("/", (req, res) => {
  userController.getAllUsers().then((result) => res.send(result));
});

router.post("/login", (req, res) => {
  userController.login(req.body).then((result) => res.send(result));
});

router.get("/details", auth.verify, (req, res) => {
  //console.log(req.headers.authorization);

  //console.log(auth.decode(req.headers.authorization))

  let userData = auth.decode(req.headers.authorization)

  //console.log(userData)

   userController.getUserProfile(userData).then(result => res.send(result))
});

module.exports = router;
