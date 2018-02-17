const express = require('express');
const router = express.Router();

//require the login controller
const user_controller = require('../controllers/user_controller');

//get the create user page
router.get('/users/create', user_controller.create_user_page);

//handle the create user post action
router.post('/users/create', user_controller.create_user);

//get the users list
router.get('/users', user_controller.user_list);

//get the user detail
router.get('/users/:id', user_controller.user_detail);

module.exports = router;