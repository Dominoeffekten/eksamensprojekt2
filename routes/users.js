const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController.js");
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', auth.postRegister);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', auth.postLogin);

// posting
router.post('/post', auth.postPost);



router.get('/logout', auth.logout);

module.exports = router;