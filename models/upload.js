//https://github.com/programmer-blog/nodejs-file-upload-with-mongodb/blob/master/routes/upload.js
//http://expressjs.com/en/resources/middleware/multer.html
const multer = require('multer');
const path = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/images/upload/',
  filename: function(req, file, cb){
    cb(null, new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 
//init
const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:2097152 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('picture');

var validateFile = function(file, cb ){
  allowedFileTypes = /jpeg|jpg|png|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

module.exports = upload;