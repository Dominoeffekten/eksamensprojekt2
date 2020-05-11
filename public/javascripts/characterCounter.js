'use strict';

import { $ } from "./modules/nQuery.js";

if($("character_remaining")){

  let countCharacters = function (e) {
    let textEntered = $('character_counter').value;
    let counter = (167 - (textEntered.length));
    let countRemaining = $('character_remaining');
    countRemaining.textContent = `${counter} character`;
  }

  let el = $('character_counter')
  el.addEventListener('keyup', countCharacters, false);

  window.addEventListener('load', countCharacters, el);

}