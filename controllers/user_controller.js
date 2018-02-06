const User = require('../domain/User');

exports.create_user_page = (req, res, next) => {
    // res.send('Login page GET');
    res.render('user/form', {
        title: 'PdrDev - Create new User'
    });
};

exports.create_user = (req, res, next) => {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        };
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/');
            }
        });
    } else {
        res.redirect('/user');
    }
};
