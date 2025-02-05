// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Middleware to check if a user has at least 'user' access
const isUser = (req, res, next) => {
  if (req.user.accessLevel !== 'user' && req.user.accessLevel !== 'employee' && req.user.accessLevel !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }
  next();
};

// Middleware to check if a user has 'employee' access or higher
const isEmployee = (req, res, next) => {
  if (req.user.accessLevel !== 'employee' && req.user.accessLevel !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }
  next();
};

// Middleware to check if a user has 'admin' access
const isAdmin = (req, res, next) => {
  if (req.user.accessLevel !== 'admin') {
    return res.status(403).json({ message: 'Access Denied' });
  }
  next();
};

module.exports = {
  isAuthenticated,
  isUser,
  isEmployee,
  isAdmin
};
