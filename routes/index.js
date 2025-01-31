const express = require("express");
const passport = require("passport");

const router = express.Router();

// Register other API routes
router.use("/", require("./swaggerRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/locations", require("./locationRoutes"));
router.use("/users", require("./userRoutes"));

// GitHub OAuth Routes
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

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

// Root endpoint
router.get('/', (req, res) => {
    res.send(req.isAuthenticated() ? `Logged in as ${req.user.name}` : "Logged Out");
});

module.exports = router;