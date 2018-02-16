const User = require('../domain/User');

let validation = {
    type: '',
    message: ''
};

exports.create_user_page = (req, res) => {
    res.render('user/form', {
        title: 'PdrDev - Create new User',
        messages: req.flash()
    });
};

exports.create_user = (req, res, next) => {

    validation = validateInput(req.body);

    req.flash(validation.type, validation.message);

    if (validation.validated) {
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };
        //use schema.create to insert data into the db
        User.create(userData, function (err) {
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
    let result = {
        validated: false,
        type: '',
        message: ''
    };
    if(input) {
        if(input.password === input.passwordConf) {
            result.validated = true;
            result.type = 'success';
            result.message = 'User created!';
        } else {
            result.type = 'danger';
            result.message = "Password didn't match.";
        }
    } else {
        result.type = 'danger'; //sucess, info, warning, danger
        result.message = 'User should put an input.';
    }

    return result;
}