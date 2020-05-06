const bcrypt = require('bcryptjs');
const mon = require('../models/mongooseWrap');
const passport = require('passport');
const mongoose = require('mongoose');
const dbServer = "localhost";
const dbName = "some";

const User = require('../models/User');
const Post = require('../models/Post');

const saltRounds = 10;
const upload = require('../models/upload');//Billede vedhæftning



exports.register = function (req, res) {
  /*
    const errors = validationResult(request);

    if(!errors.isEmpty()) {       // validator check
      request.session.feedback = {
        errors: errors.array(),
      };
      return response.redirect('/users/login')
    };
    */
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

exports.postImage = async function (req, res, next) {
    console.log(req.body);
    upload(req, res, (error) => {
        console.log(req.file.filename);
        console.log(req.file);
        let post = new Post({
            username: req.user.username,
            picture: "images/upload/"+req.file.filename,
            tag: req.body.tag,
            text: req.body.text
        });
        let cs = mon.create(Post, post);
        res.redirect('/dashboard');
    });
};

exports.postPost = async function (req, res, next) {
    console.log(req.body);
    console.log(req.user);

    //Splitter tags fra hinanden
    let text = req.body.text;
    console.log(text);
    let tags = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
    let tagSplit = text.toLowerCase().match(tags);
    console.log(tagSplit);

    let post = new Post({
        username: req.user.username,
        tag: tagSplit,
        text: req.body.text
    });
    let cs = await mon.create(Post, post);
    console.log(cs);
    res.redirect('/dashboard');
};
exports.postDelete = async function (req, res, next) { //Delete post
    let check = {_id: req.body._id}
    let cs = mon.remove(Post, check);
    res.redirect(req.get('referer'));
};
exports.postReply = async function (req, res, next) {
    console.log(req.body);
    //console.log(req.user);

    //Splitter tags fra hinanden
    let text = req.body.text;
    console.log(text);
    let tags = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
    let tagSplit = text.toLowerCase().match(tags);
    console.log(tagSplit);

    let post = new Post({
        username: req.user.username,
        tag: tagSplit,
        text: req.body.text,
        replyTo: req.body.replyTo
    });
    let cs = await mon.create(Post, post);
    console.log(cs);
    res.redirect(req.get('referer'));
};

exports.login = function (req, res) { // vis login siden
    res.render('login', {
        title: "YabbaYabbaYabba"
    });
};
exports.postLogin = function (req, res, next) { //login
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};
exports.logout = function (req, res) { //log ud
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
};