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
    let posts = await mon.retrieve(Post, {}, { sort: {created: -1}});
    res.render('dashboard', {
        title: "YabbaYabbaYabba", 
        user: req.user,
        posts: posts
    });
};

exports.getTags = async function (req,res) { //the tags site
    //console.log(req.user);
    res.render('tags', {
        title: "YabbaYabbaYabba", 
        user: req.user,
    });
};

exports.findTags = async function (req,res) { //Find the tags
    //console.log(req.user);
    console.log(req.body);
    let posts = await mon.retrieve(Post, {tag: req.body}, {tags: 1});
    //console.log(posts);
    console.log(posts);
    res.redirect("/tags");
};

exports.user = function (req,res) { //the profil site
    //console.log(req.user);
    res.render('user', {
        title: "YabbaYabbaYabba",
        user: req.user,
        avatar: req.user.avatar
    });
};

exports.darkTheme = function (req,res) { //Checks what theme the user has
    res.json(req.user);
};
exports.changeTheme = async function (req, res, next) { //change the theme
    //console.log(req.user);

    if(req.user.darkTheme){
        var change = false;
    }else{
        var change = true;
    } 
    let users = await userHandler.upsertUser(req, change);
    res.redirect(req.get('referer'));
};

exports.getPost = async function (req, res, next) { // henter opslagene
    let post = await postHandler.getPost({}, {created: 1});
    res.json(post);
};
exports.getUsers = async function (req, res, next) { // henter opslagene
    let user = await mon.retrieve(User, {}, {});
    //console.log(user);
    res.json(user);
};