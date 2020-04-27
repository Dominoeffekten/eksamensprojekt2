const monWrap = require('../models/mongooseWrap'); 
const userHandler = require('../models/userHandle'); 
const User = require('../models/User'); 

exports.frontpage = function (req, res) { //frontpage
    res.render('index', {
        
    });
};

exports.getDashboard = function (req,res) { //the post site
    //console.log(req.user);
    res.render('dashboard', {
        user: req.user
    });
};

exports.user = function (req,res) { //the profil site
    //console.log(req.user);
    res.render('user', {
        user: req.user
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
    console.log(users);
    res.redirect("user");
};