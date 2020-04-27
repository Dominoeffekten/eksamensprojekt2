const monWrap = require('../models/mongooseWrap'); 
const userHandler = require('../models/userHandle'); 
const User = require('../models/User'); 

exports.frontpage = function (req, res) {
    res.render('index', {
        
    });
};

exports.dashboard = function (req,res) {
    //console.log(req.user);
    res.render('dashboard', {
        user: req.user
    });
};

exports.user = function (req,res) {
    //console.log(req.user);
    res.render('user', {
        user: req.user
    });
};

exports.darkTheme = function (req,res) {
    res.json(req.user);
};
exports.changeTheme = async function (req,res) {
    console.log(req.user);

    if(req.user.darkTheme){
        var change = false;
    }else{
        var change = true;
    } 
    console.log(change);

    var check = { _id: req.user._id };
    let theme = new User({
        _id: req.user._id,
        darkTheme: change
    });
    let cs = await monWrap.upsert("localhost", "some", User, theme, check); 
    console.log(cs);
    res.redirect("user");
};