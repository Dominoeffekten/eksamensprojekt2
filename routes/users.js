const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const { check, validationResult } = require('express-validator'); //


router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', [
  check('username')   // express-validator
    .trim()
    .isLength({min: 3})
    .escape()
    .withMessage('You need a username'),
  check('firstName')
    .trim()
    .isLength({min: 2})
    .escape()
    .withMessage('What is yout first name?'),
  check('lastName')
    .trim()
    .isLength({min: 2})
    .escape()
    .withMessage('What is your last name?'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('you need a email')
  ], auth.postRegister);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', [
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('You need a email')
  ] , auth.postLogin);

// posting
router.post('/postImage', ensureAuthenticated, auth.postImage);  // post med billede
router.post('/post', ensureAuthenticated, auth.postPost);    // post uden billede
router.post('/delPost', ensureAuthenticated, auth.postDelete);   // delete post
router.post('/postReply', ensureAuthenticated, auth.postReply);   // lav kommentar

router.get('/logout', ensureAuthenticated, auth.logout);


module.exports = router;
