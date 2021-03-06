'use strict';

import { $ } from "./modules/nQuery.js";


let commercial = [
    {
        link: 'https://www.dplay.dk/',
        picture: 'dplay1.jpg'
    },
    {
        link: 'https://www.dplay.dk/',
        picture: 'dplay2.jpg'
    },
    {
        link: 'https://www.dplay.dk/',
        picture: 'edc.jpg'
    },
    {
        link: 'https://www.harald-nyborg.dk/',
        picture: 'harald.jpg'
    },
    {
        link: 'https://www.smarteyes.dk/',
        picture: 'smarteyes.jpg'
    },
    {
        link: 'https://www.toyota.dk/',
        picture: 'toyota.jpg'
    },
    {
        link: 'https://www.toyota.dk/',
        picture: 'toyota1.jpg'
    },
];

//Vælger et tilfældigt nummer i arrayet
let changeCommercial = function () {
    let randomCommercial = Math.floor(Math.random() * commercial.length);
    $('link').href = `${commercial[randomCommercial].link}`;
    $('reklame').src = `images/commercial/${commercial[randomCommercial].picture}`;
};

window.addEventListener("load", changeCommercial);