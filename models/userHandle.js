"use strict";
const mon = require("./mongooseWrap");
const User = require("./User");
const dbServer = "localhost";
const dbName = "some";

exports.upsertUser = async function (req, change) {
    console.log(change)
    var check = { _id: req.user._id };
    let theme = new User({
        _id: req.user._id,
        darkTheme: change
    });
    try { 
        let cs = await mon.upsert(dbServer, dbName, User, theme, check);   
        return;
} catch(e) {
    console.error(e);
    }
};

exports.getUser = async function (query, sort) {
    try {
        let cs = await mon.retrieve(dbServer, dbName, User, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
}; 

exports.delUser = async function (name) {
    try {
        let cs = await mon.remove(dbServer, dbName, User, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}