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

//following
router.post('/:username/follow', auth.required, function(req, res, next){
    var profileId = req.profile._id;

    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        return user.follow(profileId).then(function() {
            return res.json({profile: req.profile.toProfileJSONFor(user)});
        });
    }).catch(next);
});

module.exports = router;