

const parseISOString = function(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
  
const isoFormat = function (d) {  
    function pad(n) {return (n<10? '0' :  '') + n}
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
}

const diff = function(someday){
    var today = new Date(); 
    var later = new Date(someday); 
    var oneDay = 1000 * 60 * 60 * 24;// One day Time in ms (milliseconds) 
  
    var result = Math.round(later.getTime() - today.getTime()) / (oneDay); // Result in milliseconds and then into days 
    var diff = result.toFixed(0); //Resulting days value 
    return diff

    //console.log("today: " + today);
    //console.log("morgen: " + later);
    //console.log("mili: " + oneDay);
   //console.log(diff);
}

export {isoFormat, parseISOString, diff};