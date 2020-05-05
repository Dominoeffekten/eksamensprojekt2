const mon = require('../models/mongooseWrap'); 
const userHandler = require('../models/userHandle');

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
    let posts = await mon.retrieve(Post, {}, {sort: {created: -1}});
    res.render('tags', {
        title: "YabbaYabbaYabba", 
        user: req.user,
        posts: posts
    });
};

exports.findTags = async function (req,res) { //Find the tags
    //console.log(req.user);
    console.log(req.body.tag);
    let lowerCase = req.body.tag.toLowerCase();
    let posts = await mon.retrieve(Post, {tag: lowerCase}, {sort: {created: -1}});
    console.log(posts);
    //console.log(posts);
    res.render('tags', {
        title: "YabbaYabbaYabba", 
        user: req.user,
        posts: posts
    });
};

exports.user = async function (req,res) { //the profil site
    let checkPost = {username: req.user.username}
    let cp = await mon.retrieve(Post, checkPost, { sort: {created: -1}})
    //let user = await mon.retrieve(User, {}, {});
    //console.log(req.user);
    res.render('user', {
        title: "YabbaYabbaYabba",
        user: req.user,
        avatar: req.user.avatar,
        posts: cp
    });
};

exports.readUser = async function (req, res) { // load profile page for clicked user
    let checkUser = {username: req.body.username}
    let cu = await mon.retrieve(User, checkUser, {});
    let checkPost = {username: req.body.username}
    let cp = await mon.retrieve(Post, checkPost, { sort: {created: -1}})
    console.log(cu);
    console.log(cp);
    res.render('profile', {
        title: "YabbaYabbaYabba",
        user: req.user,
        profile: cu,
        posts: cp
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
    let post = await mon.retrieve(Post, {}, {});
    res.json(post);
};
exports.getUsers = async function (req, res, next) { // henter opslagene
    let user = await mon.retrieve(User, {}, {});
    //console.log(user);
    res.json(user);
};