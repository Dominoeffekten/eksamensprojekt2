
dbPassword = 'mongodb+srv://JohnDoe123:'+ encodeURIComponent('JohnDoe123') + '@yabba-aampa.mongodb.net/test?retryWrites=true';
// mongo "mongodb+srv://yabba-aampa.mongodb.net/test" --username JohnDoe123


module.exports = {
    mongoURI: dbPassword
};