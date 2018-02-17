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

exports.create_user = (req, res) => {

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
            if (err)
                req.flash('danger', err.message);
        });
    }

    res.redirect('/users');
};

exports.user_list = (req, res) => {
    User.find({}, 'username email').exec(function (err, list) {
       if (err){
           req.flash('danger', err.message);
           res.redirect('/');
       } else {
           res.render('user/list', {
               title: 'PdrDev - Users list',
               messages: req.flash(),
               user_list: list
           });
       }

    });
};

exports.user_detail = (req, res) => {
    User.findById(req.params.id).exec(function (err, result) {
       if(err) {
           req.flash('danger', err.message);
           res.redirect('/');
       } else {
           res.render('user/detail', {
               title: 'PdrDev - User detail',
               messages: req.flash(),
               username: result.username,
               email: result.email,
           });
       }
    });
};

function validateInput(input) {
    let result = {
        validated: null, //success, info, warning, danger
        type: '',
        message: ''
    };
    if(input) {
        if(input.username === ""){
            result.validated = false; result.type = 'danger'; result.message = 'Username required.';
            return result;
        }

        if(input.email === ""){
            result.validated = false; result.type = 'danger'; result.message = 'E-mail required.';
            return result;
        }

        if(input.password === ""){
            result.validated = false; result.type = 'danger'; result.message = 'Password required.';
            return result;
        }

        if(input.passwordConf === ""){
            result.validated = false; result.type = 'danger'; result.message = 'Repeat password required.';
            return result;
        }

        if(result.validated === null && input.password === input.passwordConf) {
            result.validated = true; result.type = 'success'; result.message = 'User created!';
            return result;
        } else if (result.validated === null && input.password !== input.passwordConf){
            result.type = false; result.type = 'danger'; result.message = "Password didn't match.";
            return result;
        }
    } else {
        result.validated = false; result.type = 'danger'; result.message = 'User should put an input.';
        return result;
    }

}