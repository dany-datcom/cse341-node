const isAuthenticated = (req, res, next) => {

    if (req.session.passport.user) {
        return next();
    }

    res.status(401).json({
        message: 'You must login'
    });
};

module.exports = { isAuthenticated };