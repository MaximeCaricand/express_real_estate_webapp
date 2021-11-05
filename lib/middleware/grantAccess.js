module.exports = function (accountType) {
    return async (req, res, next) => {
        if (req.user && req.user.accountType === accountType) {
            return next();
        }
        req.locals = { error: 'You Must be logged to perform this' };
        res.redirect('/login');
    }
}