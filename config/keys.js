
dbPassword = 'mongodb+srv://JohnDoe123:'+ encodeURIComponent('JohnDoe123') + '@yabba-aampa.mongodb.net/test?retryWrites=true';
//"mongodb+srv://JohnDoe123:<password>@yabba-aampa.mongodb.net/test?retryWrites=true&w=majority"

module.exports = {
    mongoURI: dbPassword
};