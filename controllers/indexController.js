const mon = require('../models/mongooseWrap'); 
const userHandler = require('../models/userHandle');

const dbServer = "localhost";
const dbName = "some";
const upload = require('../models/upload');
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
    let postCount = cp.length;
    res.render('user', {
        title: "YabbaYabbaYabba",
        user: req.user,
        avatar: req.user.avatar,
        posts: cp,
        postCount: postCount
    });
};

exports.readUser = async function (req, res) { // load profile page for clicked user
    let checkUser = {username: req.body.username}
    let cu = await mon.retrieve(User, checkUser, {});
    let checkPost = {username: req.body.username}
    let cp = await mon.retrieve(Post, checkPost, { sort: {created: -1}})
    let postCount = cp.length;
    res.render('profile', {
        title: "YabbaYabbaYabba",
        user: req.user,
        profile: cu,
        posts: cp,
        postCount: postCount
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

exports.changeAvatar = async function (req, res, next) {
    upload(req, res, (error) => {
        console.log(req.user);
        console.log(req.file.filename);
        let chk = {_id: req.user._id}
        let user = new User({
            darkTheme: req.user.darkTheme,
            approved: req.user.approved,
            avatar: "images/upload/"+req.file.filename,
            _id: req.user._id,
            username: req.user.username,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            following: req.user.following
        });
        let cs = mon.upsert(User, user, chk);
        res.redirect('user');
    });
};

exports.getPost = async function (req, res, next) { // henter opslagene
    let post = await mon.retrieve(Post, {}, {sort: {created: -1}});
    res.json(post);
};
exports.getUsers = async function (req, res, next) { // henter opslagene
    let user = await mon.retrieve(User, {}, {});
    //console.log(user);
    res.json(user);
};