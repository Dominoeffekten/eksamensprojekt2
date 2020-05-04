const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const  { check, validationResult } = require('express-validator'); //


router.get('/register', forwardAuthenticated, auth.register);
router.post('/register',
[
check('username')   // express-validator
  .trim()
  .isLength({min: 3})
  .escape()
  .withMessage('Et brugernavn er påkrævet'),
check('firstName')
  .trim()
  .isLength({min: 2})
  .escape()
  .withMessage('Et fornavn er påkrævet'),
check('lastName')
  .trim()
  .isLength({min: 2})
  .escape()
  .withMessage('Et efternavn er påkrævet'),
check('email')
  .trim()
  .isEmail()
  .normalizeEmail()
  .withMessage('En mail er påkrævet')
]
,auth.postRegister);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login',
[
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('En mail er påkrævet')
]
, auth.postLogin);

// posting
router.post('/postImage', auth.postImage);  // post med billede
router.post('/post', auth.postPost);    // post uden billede
router.post('/delPost', auth.postDelete);   // delete post
router.post('/postReply', auth.postReply);   // delete post



router.get('/logout', auth.logout);


module.exports = router;
