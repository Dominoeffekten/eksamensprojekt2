const bcrypt = require('bcryptjs');
const mon = require('../models/mongooseWrap'); 
const passport = require('passport');
const mongoose = require('mongoose');
const dbServer = "localhost";
const dbName = "some";

const User = require('../models/User'); 
const Post = require('../models/Post');

const saltRounds = 10;

exports.register = function (req, res) {
    res.render('register', {
        title: "YabbaYabbaYabba"
    });
};

exports.postRegister = function (req, res) {
    const { username, firstName, lastName, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !firstName || !lastName || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            firstName,
            lastName,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ username: username, email: email }).then( function (user) {
            if (user) {
                errors.push({ msg: 'Username or email already exists' });
                res.render('register', {
                    errors,
                    username,
                    firstName,
                    lastName,
                    email,
                    password,
                    password2
                });
            } else { 
                const newUser = new User({
                    username,
                    firstName,
                    lastName,
                    email,
                    password
                });

                bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                });
            }
        });
    }
};

exports.postPost = function (req, res) {
    console.log(req.body);
    let check = {};
    let post = new Post({
        username: req.user.username,
        picture: req.body.picture,
        tag: req.body.tag,
        text: req.body.text
    });
    let cs = mon.upsert(Post, post, check);
    res.render('dashboard', {
        title: "YabbaYabbaYabba",
        user: req.user
    });
};

exports.login = function (req, res) {
    res.render('login', {
        title: "YabbaYabbaYabba"
    });
};

exports.postLogin = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};