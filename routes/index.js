const express = require("express");
const passport = require("passport");

const router = express.Router();

router.use("/", require("./swaggerRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/locations", require("./locationRoutes"));
router.use("/users", require("./userRoutes"));

// GitHub OAuth Routes
router.get('/github/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/', session: true }),
    (req, res) => {
        res.redirect('/');
    }
);

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        req.session.destroy();
        res.redirect('/');
    });
});

module.exports = router;