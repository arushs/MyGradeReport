var express = require('express');
var router = express.Router();
var pageTitle = 'My Grade Report : ';
var User = require('./../models/user');

router.get('/', function(req, res) {
    res.render('index', {
        title : pageTitle + 'Home'
    });
});

router.get('/signup',function(req, res) {
    res.render('signup', {
        title: pageTitle + 'Sign up'
    });
});

router.get('/explore', function(req, res) {
    res.render('explore', {
        title: pageTitle + 'explore'
    });
});

router.get('/signup_confirm',function(req, res) {
    res.render('signup_pages/signup_confirm', {
        title: pageTitle + 'Welcome!'
    });
});

router.get('/signup_error',function(req, res) {
    res.render('signup_pages/signup_error', {
        title: pageTitle + 'Signup error'
    });
});

router.get('/badlogin',function(req, res) {
    res.render('badlogin', {
        title: pageTitle + 'Bad login'
    });
});

router.get('/success',function(req, res) {
    res.render('success', {
        title: pageTitle + 'Success'
    });
});

router.get('/home',function(req, res) {
    res.render('my_report', {
        title: pageTitle + 'my_report'
    });
});


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

module.exports = router;

