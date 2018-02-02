exports.enter_login_page = (req, res, next) => {
    // res.send('Login page GET');
    res.render('login');
};

exports.login = (req, res, next) => {
    // res.send('Login page GET');
    console.log(req.body);
    res.redirect('/');
};

exports.logout = (req, res, next) => {
    res.send('Login page GET');
};