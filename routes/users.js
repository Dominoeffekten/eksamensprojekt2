const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const { check, validationResult } = require('express-validator'); //


router.get('/register', forwardAuthenticated, auth.register);
router.post('/register',
  [
    check('username')   // express-validator
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage('Et brugernavn er påkrævet'),
    check('firstName')
      .trim()
      .isLength({ min: 2 })
      .escape()
      .withMessage('Et fornavn er påkrævet'),
    check('lastName')
      .trim()
      .isLength({ min: 2 })
      .escape()
      .withMessage('Et efternavn er påkrævet'),
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('En mail er påkrævet')
  ]
  , auth.postRegister);

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
router.post('/postImage', ensureAuthenticated, auth.postImage);  // post med billede
router.post('/post', ensureAuthenticated, auth.postPost);    // post uden billede
router.post('/delPost', ensureAuthenticated, auth.postDelete);   // delete post
router.post('/postReply', ensureAuthenticated, auth.postReply);   // lav kommentar

router.get('/logout', ensureAuthenticated, auth.logout);


module.exports = router;
