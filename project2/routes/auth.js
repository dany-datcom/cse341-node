const router = require('express').Router();
const passport = require('passport');

router.get('/login',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
        session: true
    }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.send('Logged out');
    });
});

module.exports = router;