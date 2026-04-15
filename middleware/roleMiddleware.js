const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user is set by authMiddleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' is not allowed to perform this action`
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };