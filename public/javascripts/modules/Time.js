

const parseISOString = function(s) { // from computer to human
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
  
const isoFormat = function (d) {  // from human to computer
    function pad(n) {return (n<10? '0' :  '') + n}
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
}


export {isoFormat, parseISOString};