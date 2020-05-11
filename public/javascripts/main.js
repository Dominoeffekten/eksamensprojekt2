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

function modal(){

    var modal = $("myModal");
    var btn = $("showFolllowing");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() { //open the modal
        modal.style.display = "block";
    }
    span.onclick = function() { // close the modal
        modal.style.display = "none";
    }
    window.onclick = function(event) { //close it outside the modal 
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

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

const showPosts = function (e) { //Skriver datoen pæn
    let posts = JSON.parse(e.target.responseText);
    let msg = "Answer too "
    for (var i = 0; i < posts.length; i++) {
        if ($("profilePosts") || $("tags")) {
            if (posts[i].replyTo != "none") {
                for (var j = 0; j < posts.length; j++) {
                    if (posts[i].replyTo === posts[j]._id) {
                        if ($("replyTo" + posts[i]._id)) {
                            let replyTo = $("replyTo" + posts[i]._id);
                            replyTo.innerHTML = msg + posts[j].username + " - " + posts[j].text;
                        }
                    }
                }
            }
        }
        if ($("posts")) {
            if (posts[i].replyTo != "none") {
                let comment = $("post" + posts[i]._id);
                let post = $("post" + posts[i].replyTo);
                comment.setAttribute("class", "post postComments");
                if ($("comments" + posts[i].replyTo)) {
                    let countComment = $("comments" + posts[i].replyTo);
                    let count = Number(countComment.innerHTML);
                    countComment.innerHTML = Number(count) + 1;
                }
                comment.removeChild(comment.childNodes[5]);
                comment.remove();
                post.appendChild(comment);
            }
        }
        if($("created" + posts[i]._id) === null) {
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

const init = function () {
    getPost();
    getUser();

    if(url === "http://localhost:3000/dashboard") { //hvis dashboard
        images();
    }
   if(url === "http://localhost:3000/user") { 
        let profile = $("changeProfilePicture");
        var span = document.getElementsByClassName("closeProfile")[0];

        $("changeProfile").addEventListener("click", function() {
            profile.style.display = "flex";
        });
        span.onclick = function() { // close the modal
            profile.style.display = "none";
        }
    }
    if($("profileHead")) { //andres profilside
        if($("unfollowInput")){
            $("followInput").remove();
        }
    }
    if($("myModal")) { //profilside
        modal();
    }
};

window.addEventListener('load', init);