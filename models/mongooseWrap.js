"use strict";
/*
 * wrapper for CRUD functionality of a mongodb with mongoose
 */
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// mongoose.set('debug', true);
// mongoose.set('debug', { color: false });

//Læser
exports.retrieve = async function(obj, query, sort) {
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
      stuff = await obj.findOneAndUpdate(chk, newquery, {     
      upsert: true                                       
      });
    } catch(err) {
        console.log(error);
    } finally {
        return stuff;
    }
}

//Sletter
exports.remove = async function(obj, name) {
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

exports.create = async function(obj, query) {
    let rc = null;
    try { 
        rc = await obj.create(query);
    } catch(err) {
        console.log(error);
    } finally {
        return rc;
    }
};