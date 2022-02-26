const express = require('express');
const router = express.Router();
const streetController = require('../controllers/streetController');


// Register a street
router.post('/register', (req, res) => {
  console.log(req.body);
  streetController.registerStreet(req.body).then((result) => res.send(result));
});

// Get all streets
router.get('/all', (req, res) => {
 
  
    streetController.getAllStreets().then((result) => res.send(result));
  });




module.exports = router;
