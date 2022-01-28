const express = require('express')
const router = express.Router()

//syntax: router.HTTPmethod()
router.get('/',(req,res)=>{
  console.log("hello from userRoutes")
  res.send("Hello from userRoutes")
})


module.exports = router