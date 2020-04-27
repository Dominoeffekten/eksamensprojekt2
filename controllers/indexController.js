const monWrap = require('../models/mongooseWrap'); 
const User = require('../models/User'); 

exports.frontpage = function (req, res) {
    res.render('index', {
        
    });
};

exports.dashboard = function (req,res) {
    console.log(req.user);
    res.render('dashboard', {
        user: req.user
    });
};

exports.user = function (req,res) {
    console.log(req.user);
    res.render('user', {
        user: req.user
    });
};

exports.darkTheme = function (req,res) {
    res.json(req.user);
};
exports.changeTheme = async function (req,res) {
    console.log(req.user);
    console.log("Jeg kom ind");
    var user = req.user;

    if(user.darkTheme){
        var change = false;
    }else{
        var change = true;
    }
    var check = { _id: user.id };
    let theme = new User({
        darkTheme: change
    });
    try { 
        let cs = await monWrap.upsert("localhost", "some", User, theme, check);  
        console.log(cs);
        res.render('user', {
            user: req.user
        });
        return
    } catch(e) {
        console.error(e);
    }
    console.log(req.user);
    //res.redirect("/user");
    
};