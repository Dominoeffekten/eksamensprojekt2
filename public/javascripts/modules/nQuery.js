'use strict';
/**
 * nQuery, *the* JS Framework
 */
const $ = function (foo) {
    return document.getElementById(foo);
}

const deg2rad = function(deg) {
    return deg * Math.PI / 180;
}

const randomColor = function() {
    let hexDigits = '0123456789abcdef';
    let rrggbb = '#';
    for (let i = 0; i < 6; i++) {
        rrggbb += hexDigits[Math.floor(Math.random() * 16)];
    }
    return rrggbb;
}
/*
 * kudos Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * yiq
 * @param: toWhat => '#rrggbb'
 */
const contrastColor = function(toWhat) {
    toWhat = toWhat.substr(1);
    let r = parseInt(toWhat.substr(0,2),16);
    let g = parseInt(toWhat.substr(2,2),16);
    let b = parseInt(toWhat.substr(4,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

export {$, randomColor, contrastColor};
