exports.frontpage = function (req, res) {
    res.render('index', {
        
    });
};

exports.dashboard = function (req,res) {
    res.render('dashboard', {
        user: req.user
    });
};

exports.user = function (req,res) {
    res.render('user', {
        user: req.user
    });
};