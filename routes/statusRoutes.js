const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');


// Register a status
router.post('/register', (req, res) => {
  
  console.log(req.body);
  statusController.registerStatus(req.body).then((result) => res.send(result));
});

// Get all status
router.get('/all', (req, res) => {
 
  
    statusController.getAllStatuses().then((result) => res.send(result));
  });




module.exports = router;
