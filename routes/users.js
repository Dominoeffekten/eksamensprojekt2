const express = require('express');
const router = express.Router();
const auth = require("../controllers/authController.js");
const { forwardAuthenticated } = require('../config/auth');



router.get('/register', forwardAuthenticated, auth.register);
router.post('/register', auth.postRegister);

router.get('/about', auth.about);

router.get('/login', forwardAuthenticated, auth.login);
router.post('/login', auth.postLogin);



router.get('/logout', auth.logout);

module.exports = router;