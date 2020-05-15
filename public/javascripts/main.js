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

function modalf(){

    var modal = $("myModalF");
    var btn = $("showFollowers");
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
                comment.setAttribute("class", "post postComments " + "post" + posts[i].username);
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
    const getUsers = function (ev) {
        let req = Object.create(Ajax);
        req.init();
        req.getFile("/getUser", showUser);
    };
    const showUser = function (e) {
        let user = JSON.parse(e.target.responseText);
        console.log(user);
        console.log(posts);
        if (user.following.length > 0) {
            let allPosts = document.getElementsByClassName("post");
            for (var i = 0; i < allPosts.length; i++) {
                allPosts[i].style.display = "none";
            }
            for (var i = 0; i < user.following.length; i++) {
                console.log(user.following[i]);
                let followedPosts = document.getElementsByClassName("post" + user.following[i]);    // finds followed posts for looped user
                for (var j = 0; j < followedPosts.length; j++) {    // loops though posts from that user
                    followedPosts[j].style.display = "block";   // display all those posts
                }
                let ownPosts = document.getElementsByClassName("post" + user.username); // finds ur own posts
                for (var q = 0; q < ownPosts.length; q++) { // loops through own posts
                    ownPosts[q].style.display = "block";    // displays own posts
                }
                for (var k = 0; k < posts.length; k++) {
                    if (posts[k].replyTo != "none") {       // if comment
                        if (posts[k].username === user.following[i]) {  // if user of comment is the same user who we follow
                            $("post" + posts[k].replyTo).style.display = "block";   // show original post
                        }
                        let originalPost = $("post" + posts[k].replyTo)
                        if (originalPost.style.display === "block") {       // if post comment replies to is shown 
                            $("post" + posts[k]._id).style.display = "block";   // show all comments for that post
                        }
                    }
                }
            }
        } else {
            console.log("show all posts");
        }
    }
    if ($("posts")) {
        getUsers();
    }
}

const showUsers = function (e) { //viser avatar billedet
    let users = JSON.parse(e.target.responseText);

    console.log(users);
    let posts = document.getElementsByClassName("profileImage");
    for (var i = 0; i < users.length; i++) {
    	let className = document.getElementsByClassName("avatar" + users[i].username);
    	for (var j = 0; j < className.length; j++) {
    		className[j].setAttribute("src", users[i].avatar)
    	}
    }
    const getUsers = function (ev) {
        let req = Object.create(Ajax);
        req.init();
        req.getFile("/getUser", showUser);
    };
    const showUser = function (e) {
        let user = JSON.parse(e.target.responseText);
        let ownUser = user.username;
        let count = 0;
        console.log(ownUser);
        if ($("followersCount")) {
            for (var i = 0; i < users.length; i++) {
                for (var j = 0; j < users[i].following.length; j++) {
                    if (ownUser === users[i].following[j]) {
                        console.log(users[i].username + "følger dig");
                        count = count + 1;
                        $("followersCount").innerHTML = count;

                        let div = document.createElement("div");
                        div.setAttribute("class", "usernameLink");
                        let followerForm = document.createElement("form");
                        followerForm.setAttribute("id", "followerForm");
                        followerForm.setAttribute("action", "/userPage");
                        followerForm.setAttribute("method", "post");
                        let input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        input.setAttribute("name", "username");
                        input.setAttribute("value", users[i].username);
                        followerForm.appendChild(input);
                        let input1 = document.createElement("input");
                        input1.setAttribute("type", "submit");
                        input1.setAttribute("value", users[i].username);
                        followerForm.appendChild(input1);
    
                        div.appendChild(followerForm);
                        $("modalContent").appendChild(div);
                    }

                }
            }
        }
        if ($("followersCounts")) {
            let otherUser = $("otherUser").innerText;
            console.log(users);
            console.log(otherUser);
            for (var i = 0; i < users.length; i++) {
                for (var j = 0; j < users[i].following.length; j++) {
                    if (otherUser === users[i].following[j]) {
                        console.log(users[i].username + "følger dig");
                        count = count + 1;
                        $("followersCounts").innerHTML = count;

                        let div = document.createElement("div");
                        div.setAttribute("class", "usernameLink");
                        let followerForm = document.createElement("form");
                        followerForm.setAttribute("id", "followerForm");
                        followerForm.setAttribute("action", "/userPage");
                        followerForm.setAttribute("method", "post");
                        let input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        input.setAttribute("name", "username");
                        input.setAttribute("value", users[i].username);
                        followerForm.appendChild(input);
                        let input1 = document.createElement("input");
                        input1.setAttribute("type", "submit");
                        input1.setAttribute("value", users[i].username);
                        followerForm.appendChild(input1);
    
                        div.appendChild(followerForm);
                        $("modalContent").appendChild(div);
                    }

                }
            }
        }
    }
    getUsers();
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
    if($("myModalF")) {
        modalf();
    }
};

window.addEventListener('load', init);