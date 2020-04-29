"use strict";
const mon = require("./mongooseWrap");
const Post = require("./Post");
const dbServer = "localhost";
const dbName = "some";


exports.getPost = async function (query, sort) {
    try {
        let cs = await mon.retrieve(Post, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
}; 

exports.delPost = async function (name) {
    try {
        let cs = await mon.remove(Post, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}