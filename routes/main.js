
var pageTitle = 'My Grade Report : ';
var User = require('./../models/user');

exports.index = function(req, res) {
    res.render('index', {
        title : pageTitle + 'Home'
    });
};

exports.signup = function(req, res) {
    res.render('signup', {
        title: pageTitle + 'Sign up'
    });
};

exports.explore = function(req, res) {
    res.render('explore', {
        title: pageTitle + 'explore'
    });
};

exports.signup_confirm = function(req, res) {
    res.render('signup_pages/signup_confirm', {
        title: pageTitle + 'Welcome!'
    });
};

exports.signup_error = function(req, res) {
    res.render('signup_pages/signup_error', {
        title: pageTitle + 'Signup error'
    });
};

exports.bad_login = function(req, res) {
    res.render('badlogin', {
        title: pageTitle + 'Bad login'
    });
};

exports.success = function(req, res) {
    res.render('success', {
        title: pageTitle + 'Success'
    });
};

exports.my_report = function(req, res) {
    res.render('my_report', {
        title: pageTitle + 'my_report'
    });
};


exports.new_user = function(req, res) {
    var user = new User({
        firstName: req.body.user_first,
        lastName: req.body.user_last,
        email: req.body.user_email,
        userName: req.body.user_uname,
        password: req.body.user_password
    });

    user.save(function(err) {
        if (err) {
            res.redirect('/signup/error');
        } else {
            res.redirect('/signup/confirm');
        }
    });
};

exports.check_login = function(req, res) {
    User.find({'userName': req.body.login_uname}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            if (user[0] == null) {
                res.redirect('/badlogin')
            } else {
                user[0].comparePasswords(req.body.login_password);
                res.redirect('/my_report')
            }
        }
    });

}
