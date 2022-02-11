const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('./../auth');

// Register a User
router.post('/register', (req, res) => {
  console.log(req.body);
  userController.register(req.body).then((result) => res.send(result));
});

// Login/Authenticate a User
router.post('/login', (req, res) => {
  userController
    .login(req.body)

    .then((result) => res.send(result));
});

// Set user to admin by admin only
router.put('/:userId/setAsAdmin', auth.verify, (req, res) => {
  let access = auth.decode(req.headers.authorization);
  let userId = req.params.userId;

  console.log(userId);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
    console.log('admin account');
    userController.setToAdmin(userId).then((result) => {
      if (result == null) {
        res.send('no existing id');
      } else {
        res.send(`${result._id} set to admin`);
      }
    });
  }
});

// Get all Users by admin only
router.get('/all', auth.verify, (req, res) => {
  let access = auth.decode(req.headers.authorization);
  let userId = req.params.userId;

  console.log(userId);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
    console.log('admin account');
    userController.getAllUsers().then((result) => res.send(result));
  }
});

// Delete user
router.delete('/:userId/delete', (req, res) => {
  console.log(req.params);

  let access = auth.decode(req.headers.authorization);
  let userId = req.params.userId;

  console.log(userId);

  if (access.isAdmin == false) {
    console.log('not an admin');
    res.send(false);
  } else {
    console.log('admin account');
    userController.deleteUser(req.params.userId).then((result) => {
      if (result == null) {
        res.send('no existing id');
      } else {
        res.send(`You have deleted id# ${result.id}`);
      }
    });
  }
});

//my Orders
router.get('/myOrders', auth.verify, (req, res) => {
 // const userId = req.body._id;
  let access = auth.decode(req.headers.authorization);
 // console.log(access.id)
  if (access.isAdmin == true) {
    console.log('not for admin');
    res.send(false);
  } else {
    userController.getMyOrder(access.id).then((result) => {
      res.send(result);
    });
  }
});

// all orders - admin only
router.get('/orders', auth.verify, (req, res) => {
  let access = auth.decode(req.headers.authorization);
  if (access.isAdmin == false) {
    console.log('for admin only');
    res.send(false);
  } else {
    userController.getAllOrders().then((result) => res.send(result));
  }
});

router.post('/checkout', auth.verify, (req, res) => {
  let userId = auth.decode(req.headers.authorization).id;
  let cart = req.body;
  let access = auth.decode(req.headers.authorization);
  if (access.isAdmin == true) {
    console.log('not for admin');
    res.send(false);
  } else {
    userController.checkout(userId, cart).then((result) => res.send(result));
  }
});

module.exports = router;
