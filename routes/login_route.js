const express = require('express');
const router = express.Router();

//require the login controller
const login_controller = require('../controllers/login_controller');

router.get('/login', login_controller.enter_login_page)
    .post('/login', login_controller.login);



module.exports = router;