"use strict"
import { isoFormat, parseISOString } from "./modules/Time.js";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

let url = window.location.href;

//laver en ny form, hvis der skal være et billede i et opslag
function images(){ 
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
}

const getPost = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/getPost", showPosts);
};
const getComment = function (ev) { //Viser kommentar
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/getPost", showComment);
};

const getUser = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/getUsers", showUsers);
};

const showPosts = function (e) { //Skriver datoen pæn
    let posts = JSON.parse(e.target.responseText);
    //console.log(posts);
   
    for (var i = 0; i < posts.length; i++) {
        if($("created" + posts[i]._id) === null){
        } else {
            let link = $("created" + posts[i]._id);
            link.innerHTML = posts[i].created.split("T")[0];
        }
    }
}

const showUsers = function (e) { //viser avatar billedet
    let users = JSON.parse(e.target.responseText);
    //console.log(users);
    let posts = document.getElementsByClassName("profileImage");
    for (var i = 0; i < users.length; i++) {
    	let className = document.getElementsByClassName("avatar" + users[i].username);
    	for (var j = 0; j < className.length; j++) {
    		className[j].setAttribute("src", users[i].avatar)
    	}
    }
}

function showComment(e) {
    let posts = JSON.parse(e.target.responseText);
    console.log("kommentar");
    
    //console.log(posts);
    //console.log(posts[i])
    let id = "5eb00008770af51b0a5d634a"
    for (var i = 0; i < posts.length; i++) {
        if (posts[i].replyTo != "none"){ //finder dem som er kommentar
        //if (posts[i].replyTo === id){
            console.log(posts[i].replyTo)
           
            console.log("re " + posts[i].replyTo)
            console.log("picture "+posts[i].picture);
            console.log("replyto "+posts[i].replyTo);
            console.log("tag "+posts[i].tag);
            console.log("text "+posts[i].text);
            console.log("udername "+posts[i].username);
            
            let commentDIV = document.createElement("div");
            commentDIV.setAttribute("class", "post");

            let row1 = document.createElement("row");
            let row2 = document.createElement("row");
            commentDIV.appendChild(row1);
            row1.appendChild(row2);

            let profilDIV = document.createElement("div");
            profilDIV.setAttribute("class", "profileImage");
            row2.appendChild(profilDIV);

            let img = document.createElement("img");
            img.setAttribute("class", "avatar"+posts[i].username);
            img.setAttribute("scr", "images/avatar.jpeg");
            profilDIV.appendChild(img);

            let userDIV = document.createElement("div");
            userDIV.setAttribute("class", "usernameLink");
            let a =  document.createElement("a");
            a.setAttribute("href", "/user");
            let link = document.createTextNode(posts[i].username);
            a.appendChild(link);
            userDIV.appendChild(a);
            profilDIV.appendChild(userDIV);

            let datoDIV = document.createElement("div");
            let label =  document.createElement("label");
            label.setAttribute("id", "created"+posts[i]._id);
            datoDIV.appendChild(label);
            profilDIV.appendChild(datoDIV);

            let postDIV = document.createElement("div");
            postDIV.setAttribute("class", "postText");
            postDIV.setAttribute("id", "postText");

            let h3 = document.createElement("h3");
            let text = document.createTextNode(posts[i].text);
            h3.appendChild(text);
            postDIV.appendChild(h3);
            row1.appendChild(postDIV);

            $('commentReplies').appendChild(commentDIV); 
        }
    }
};


const init = function () {
    getPost();
    getUser();

    if(url === "http://localhost:3000/dashboard") {
        images();
    }
    if($("yabbaPost")) {
        getComment();
    }

    
};

window.addEventListener('load', init);
