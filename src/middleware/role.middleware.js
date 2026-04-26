const roleMiddleware = (role) => {
  return (req, res, next) => {
    try {
      // check user exists
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - No user found",
        });
      }

      // check role
      if (req.user.role !== role) {
        return res.status(403).json({
          success: false,
          message: "Access denied - Admin only",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server error in role middleware",
      });
    }
  };
};

module.exports = roleMiddleware;