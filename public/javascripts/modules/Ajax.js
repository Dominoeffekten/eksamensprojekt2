'use strict';
/*
 * AJaX object
 * @author NML
 * @Date Nov 2019
 */
let Ajax = {
    init() {
        this.ajaxobj = false;
        try {
            this.ajaxobj = new XMLHttpRequest();
        } catch(err) {
            window.alert(err.message + " Get yourself a browser ;)");
        }
    },

/*
 * method: getFile
 * @param filename: url of wanted file
 * @param callback: function to handle response
 */
    getFile(url, callback) {
        try {
            this.ajaxobj.addEventListener('load', function(ev) {
                callback(ev);
            });
            this.ajaxobj.open("GET", url);
            this.ajaxobj.send("");
        } catch(err) {
            window.alert(err.message + 'WTF');
        }
    }
}

export {Ajax};
