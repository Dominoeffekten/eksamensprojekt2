const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const idx = require("../controllers/indexController");

router.get('/', forwardAuthenticated, idx.frontpage);

router.get('/dashboard', ensureAuthenticated, idx.getDashboard);
router.get('/getPost', ensureAuthenticated, idx.getPost); //henter opslagene
router.get('/getUsers', ensureAuthenticated, idx.getUsers); //henter users

router.get('/tags', ensureAuthenticated, idx.getTags);

router.get('/user', ensureAuthenticated, idx.user);

//Dark Theme
router.get('/darkTheme', ensureAuthenticated, idx.darkTheme);
router.get('/changeTheme', ensureAuthenticated, idx.changeTheme);
module.exports = router;