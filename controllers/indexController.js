const mon = require('../models/mongooseWrap'); 
const userHandler = require('../models/userHandle'); 
const postHandler = require('../models/postHandle'); 

const dbServer = "localhost";
const dbName = "some";

const User = require('../models/User'); 
const Post = require('../models/Post');

exports.frontpage = function (req, res) { //frontpage
    res.render('login', {
        title: "YabbaYabbaYabba"
    });
};

exports.getDashboard = async function (req,res) { //the post site
    res.render('dashboard', {
        title: "YabbaYabbaYabba", 
        user: req.user
    });
};

exports.getTags = function (req,res) { //the post site
    //console.log(req.user);
    res.render('tags', {
        title: "YabbaYabbaYabba", 
        user: req.user
    });
};

exports.user = function (req,res) { //the profil site
    //console.log(req.user);
    res.render('user', {
        user: req.user,
        avatar: req.user.avatar
    });
};

exports.darkTheme = function (req,res) { //Checks what theme the user has
    res.json(req.user);
};
exports.changeTheme = async function (req, res, next) { //change the theme
    console.log(req.user);

    if(req.user.darkTheme){
        var change = false;
    }else{
        var change = true;
    } 
    let users = await userHandler.upsertUser(req, change);
    res.redirect("/user");
};

exports.getPost = async function (req, res, next) { // henter opslagene
    let post = await postHandler.getPost({}, {});
    res.json(post);
}