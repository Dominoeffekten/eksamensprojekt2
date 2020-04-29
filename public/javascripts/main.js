"use strict"
import { isoFormat, parseISOString } from "./modules/Time.js";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

const getPost = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/getPost", showPosts);
};

const showPosts = function (e) {
    let userPosts = JSON.parse(e.target.responseText);
    console.log(userPosts)
}


const init = function () {
    if ($('posts')) {   // on the right page
        getPost();
    }
};

window.addEventListener('load', init);