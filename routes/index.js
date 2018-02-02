const express = require('express');
const router = express.Router();

//route for the login page
router.use(require('./login_route'));

module.exports = router;