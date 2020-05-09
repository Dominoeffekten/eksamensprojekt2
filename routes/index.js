const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const idx = require("../controllers/indexController");

router.get('/', forwardAuthenticated, idx.frontpage);

router.get('/dashboard', ensureAuthenticated, idx.getDashboard); //viser opslagene
router.get('/getPost', ensureAuthenticated, idx.getPost); //henter opslagene

router.get('/tags', ensureAuthenticated, idx.getTags); //viser tags
router.post('/findTags', ensureAuthenticated, idx.findTags); //henter tags

router.get('/user', ensureAuthenticated, idx.user); //viser ens egne profilen
router.get('/getUsers', ensureAuthenticated, idx.getUsers); //henter users
router.post('/userPage', ensureAuthenticated, idx.readUser);   // Reads another user page

//Dark Theme
router.get('/darkTheme', ensureAuthenticated, idx.darkTheme);
router.post('/changeAvatar', ensureAuthenticated, idx.changeAvatar);
router.get('/changeTheme', ensureAuthenticated, idx.changeTheme);

//follow
router.post('/userPage/follow', ensureAuthenticated, idx.newFollow);
//router.post('/userPage/unfollow', ensureAuthenticated, idx.delFollow);

module.exports = router;