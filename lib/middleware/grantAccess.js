module.exports = function (allowedAccount) {
    return async (req, res, next) => {
        if (req.user && allowedAccount.includes(req.user.accountType)) {
            return next();
        }
        req.locals = { error: 'You Must be logged to perform this' };
        res.redirect('/login');
    }
}