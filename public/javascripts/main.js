"use strict"
import { isoFormat, parseISOString } from "./modules/Time.js";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

$("input").addEventListener("change", function() {
    $("idSubmit").setAttribute("action", "/users/postImage");
    $("idSubmit").setAttribute("enctype", "multipart/form-data");
    var reader = new FileReader();
    reader.onload = function(){
        var output = $('output');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

const getPost = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/getPost", showPosts);
};

const getUser = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/getUsers", showUsers);
};

const showPosts = function (e) {
    let posts = JSON.parse(e.target.responseText);
    console.log(posts);

    for (var i = 0; i < posts.length; i++) {
        let link = $("created" + posts[i]._id);
        link.innerHTML = posts[i].created.split("T")[0];
    }
}

const showUsers = function (e) {
    let users = JSON.parse(e.target.responseText);
    console.log(users);
    let posts = document.getElementsByClassName("profileImage");
    for (var i = 0; i < users.length; i++) {
    	let className = document.getElementsByClassName("avatar" + users[i].username);
    	for (var j = 0; j < className.length; j++) {
    		className[j].setAttribute("src", users[i].avatar)
    	}
    }
}


const init = function () {
    getPost();
    getUser();
};

window.addEventListener('load', init);
