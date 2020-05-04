'use strict';

import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

let commercial = [
    'dplay.png',
    'dplay1.png',
    'dplay2.png',
    'edc.png',
    'harald.png',
    'smarteyes.png',
    'toyota.png',
    'toyota1.png'
];

let changeCommercial = function () {
    let req = Object.create(Ajax);
    let randomCommercial = Math.floor(Math.random() * commercial.length);
    $('reklame').src = `images/commercial/${commercial[randomCommercial]}`;
    console.log(`Reklamen der sættes ind er: ${commercial[randomCommercial]}`)
};

window.addEventListener("load", changeCommercial);