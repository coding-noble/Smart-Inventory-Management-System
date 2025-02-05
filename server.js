const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();
const dashboardRoutes = require("./routes/dashboard");

const routes = require('./routes');
require('./config/passport');

const app = express();

app.use(express.json());
app.use(express.static("public")); // Serve static files
app.use(cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*"
}));

// Dashboard route
app.use("/dashboard", dashboardRoutes);

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use routes (includes all API and OAuth routes)
app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}/`);
});
