const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');


// Register a street
router.post('/register', (req, res) => {
  
  console.log(req.body);
  cityController.registerCity(req.body).then((result) => res.send(result));
});

// Get all streets
router.get('/all', (req, res) => {
 
  
    cityController.getAllCities().then((result) => res.send(result));
  });




module.exports = router;
