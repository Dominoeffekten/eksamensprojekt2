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

router.delete('/:username/follow', auth.required, function(req, res, next) {
    var profileId = req.profile._id;

    User.findById(req.payload.id).then(function(user) {
        if (!user) { return res.sendStatus(401); }

        return user.unfollow(profileId).then(function() {
            return res.json({profiles: req.profile.toProfileJSONFor(user)});
        });
    }).catch(next);
});