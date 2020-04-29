"use strict";
/*
 * wrapper for CRUD functionality of a mongodb with mongoose
 */
const mongoose = require('mongoose');
// mongoose.set('debug', true);
// mongoose.set('debug', { color: false });

//Læser
exports.retrieve = async function(url, dbn, obj, query, sort) {
    let stuff = null;
    try {
        stuff = await obj.find(query, null, sort);
    } catch(err) {
        console.log(error);
    } finally {
        return stuff;
    }
}

//Indsætter
exports.upsert = async function(obj, query, chk) {
    let stuff = null;
    let newquery = query.toObject();
    delete newquery._id;                  
    try {
      stuff = await obj.updateOne(chk, newquery, {     
      upsert: true                                       
      });
    } catch(err) {
        console.log(error);
    } finally {
        return stuff;
    }
}

//Sletter
exports.remove = async function(url, dbn, obj, name) {
    let stuff = null;
    try {
        stuff = await obj.deleteOne(name, (err) => {});
        console.log("Successful deletion");
    } catch(err) {
        console.log(error);
    } finally {
        return stuff;
    }
}