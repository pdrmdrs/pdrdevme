const express = require('express');
const router = express.Router();

//require the login controller
//const login_controller = require('../controllers/login_controller

router.get('/login', (req, res, next) => {
    res.send('Login page GET')
});

router.post('/login', (req, res, next) => {
    res.send('Login page POST')
});

module.exports = router;