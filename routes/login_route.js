const express = require('express');
const router = express.Router();

//require the login controller
const login_controller = require('../controllers/login_controller');

//enter the login page
router.get('/login', login_controller.enter_login_page);

//handle the login button action
router.post('/login', login_controller.login);

module.exports = router;