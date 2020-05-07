'use strict';

import { $ } from "./modules/nQuery.js";

let countCharacters = function (e) {
  let textEntered = $('character_counter').value;
  let counter = (167 - (textEntered.length));
  let countRemaining = $('character_remaining');
  countRemaining.textContent = `${counter} tegn`;
}

/*
if (countRemaining.textContent >= 160) {
  $('character_remaining').style.display = "none";
} else {
  $('character_remaining').style.display = "block";
}
*/

let el = $('character_counter')
el.addEventListener('keyup', countCharacters, false);

window.addEventListener('load', countCharacters, el);