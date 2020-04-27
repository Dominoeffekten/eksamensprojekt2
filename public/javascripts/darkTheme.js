"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

//API kaldet
const getTheme = function (ev) {
    let req = Object.create(Ajax);
    req.init();
    req.getFile("/darkTheme", showTheme);
};

const showTheme = function (e) {

    let userTheme = JSON.parse(e.target.responseText);
    console.log(userTheme.darkTheme)
    let theme = userTheme.darkTheme; //true or false

    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;

    if(theme){
        toggleSwitch.checked = true;
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        //$("checkbox").setAttribute("checked", "true");
    } else {
        toggleSwitch.checked = false;
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        //$("checkbox").setAttribute("checked", "false");
    }

    function changeTheme(e){
        if(e.target.checked){
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            window.location.href = "changeTheme";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            window.location.href = "changeTheme";
        }
    }
    toggleSwitch.addEventListener("change", changeTheme);
    
/*
    function switchTheme(e){
        if(e.target.checked){
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    }

    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark"){
            toggleSwitch.checked = true;
        }
    }
    toggleSwitch.addEventListener("change", switchTheme, false);
*/
};

window.addEventListener("load", getTheme);