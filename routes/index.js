const express = require('express');
const router = express.Router();

//route for the login page
router.use(require('./login_route'));

//entry page for the app
router.get('/', (req, res, next) => {
    // res.send('Olá mundo!')
    res.render('index');
});
router.get('/index', (req, res, next) => {
    res.redirect('/');
});

//handle 404
router.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

module.exports = router;