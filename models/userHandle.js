"use strict";
const mon = require("./mongooseWrap");
const User = require("./User");
const dbServer = "localhost";
const dbName = "some";

exports.upsertUser = async function (req, change) {
    console.log(change);
    var check = { _id: req.user._id }; // check object for existence
    let theme = new User({ // create obejct in db-format
        darkTheme: change,
        approved: req.user.approved,
        avatar: req.user.avatar,
        _id: req.user._id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
    });
    try { 
        let cs = await mon.upsert(User, theme, check); 
        return;
} catch(e) {
    console.error(e);
    }
};

exports.getUser = async function (query, sort) {
    try {
        let cs = await mon.retrieve(User, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
}; 

exports.delUser = async function (name) {
    try {
        let cs = await mon.remove(User, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}