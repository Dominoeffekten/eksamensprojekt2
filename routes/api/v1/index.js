var express = require("express");
var router = express.Router();
var path = require("path");
var tool = require("array-tools");
var db = require("../../../utils/handlers/user");
var User = require("../../../utils/models/user");

router.post("/v1/follow", function(req, res, next) {
    db.findOne(req.body, (err, user) => {
        var disabled = false;
        for (var i = 0; i < user.followers.length; i++) {
            if (user.followers[i] == req.session._id) {
                console.log(i);
                return (disabled = true);
            }
        }
        if (disabled) {
            res.status(200).send("disabled");
        } else {
            user.followers.push(req.session._id);
            user.notifications.push({
                msg: `${req.session.user} started following you.`,
                link: `/u/${req.session.user}`,
                time: new Date()
            });
            user = User(user);
            user.save(err => {
                res.status(200).send("done");
            });
        }
    });
});

module.exports = router;