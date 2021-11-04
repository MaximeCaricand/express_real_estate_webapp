module.exports = function (isAdmin) {
    return async (req, res, next) => {
        if (req.user) {
            if (!isAdmin || req.user.isAdmin) {
                return next();
            }
        }
        req.locals = { error: 'You Must be logged to perform this' };
        res.redirect('/login');
    }
}