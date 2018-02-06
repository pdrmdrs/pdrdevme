const express = require('express');
const router = express.Router();

//require the login controller
const user_controller = require('../controllers/user_controller');

//get the create user page
router.get('/user', user_controller.create_user_page);

//handle the create user post action
router.post('/user', user_controller.create_user);

module.exports = router;