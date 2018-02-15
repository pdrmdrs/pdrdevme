const User = require('../domain/User');

exports.create_user_page = (req, res, next) => {
    // res.send('Login page GET');
    res.render('user/form', {
        title: 'PdrDev - Create new User',
        message: req.flash()
    });
};

exports.create_user = (req, res, next) => {

    let validation = validateInput(req.body);

    console.log(validation.type + " " + validation.message);
    req.flash(validation.type, validation.message);

    if (validation.validated) {
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.redirect('/user');
    }
};

function validateInput(input) {
    let result = {};
    if(input) {
        result.validated = true;
        if(input.password === input.passwordConf) {
            result.type = 'sucess';
            result.message = 'User created!';
        } else {
            result.validated = false;
            result.type = 'danger';
            result.message = "Password didn't match.";
        }
    } else {
        result.validated = false;
        result.type = 'danger'; //sucess, info, warning, danger
        result.message = 'User should put an input.';
    }

    return result;
}