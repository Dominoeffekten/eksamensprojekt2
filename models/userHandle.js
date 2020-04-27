"use strict";
const mon = require("./mongooseWrap");
const User = require("./User");
const dbServer = "localhost";
const dbName = "some";

exports.upsertUser = async function (req) {
    const user = new User({
        username: req.body.username,
        firstName: req.body.username,
        lastName: req.body.username,
        email: req.body.username,
    });
    try { 
        let cs = await mon.upsert(dbServer, dbName, User, user, chk);   
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