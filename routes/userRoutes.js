const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth");

// Register a User
router.post("/register", (req, res) => {
  console.log(req.body);
  userController.register(req.body).then((result) => res.send(result));
});

router.get("/all", (req, res) => {
  userController.getAllUsers().then((result) => res.send(result));
});

router.get("/name", (req,res)=>{
  userController.getSpecificUser(req.body)
  .then((result)=> res.send(result));
})

module.exports = router;
