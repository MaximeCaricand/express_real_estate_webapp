const passport = require('passport');

module.exports = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            res.locals.email = req.body.email;
            return res.render('pages/login', { error: 'Invalid email or password' });
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return next();
        });
    })(req, res, next);
}