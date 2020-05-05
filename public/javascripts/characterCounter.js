'use strict';

import { $ } from "./modules/nQuery.js";

let countCharacters = function (e) {
    let textEntered = $('character_counter').value;
    let counter = (167 - (textEntered.length));
    let countRemaining = $('character_remaining');
    countRemaining.textContent = counter;
}
/*
if (counter >= 160) {
  countRemaining.style.display = "none";
} else {
  countRemaining.style.display = "block";
}*/
let el = $('character_counter').addEventListener('keyup', countCharacters, false);

window.addEventListener('load', el);