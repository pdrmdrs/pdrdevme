const User = require('../domain/User');

exports.enter_login_page = (req, res, next) => {
    // res.send('Login page GET');
    res.render('login', {
        title: 'PdrDev - Login'
    });
};

exports.login = (req, res, next) => {
    // res.send('Login page GET');
    // console.log(req.body);
    // res.redirect('/');
    User.authenticate(req.body.email, req.body.password, (err, user) => {
        if(err || !user) {
            res.status(401);
            console.log('User not found/password incorrect');
            res.redirect('/');
        } else {
            req.session.user_id = user._id;
            console.log('Username = ' + user.username);
            res.redirect('/dashboard');//TODO: make a router for the dashboard
        }
    });
};

exports.logout = (req, res, next) => {
    res.send('Login page GET');
};