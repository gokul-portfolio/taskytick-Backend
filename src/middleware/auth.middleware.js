const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 🔹 1. Get Authorization header
    const authHeader = req.headers.authorization;

    // 🔹 2. Check header format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token provided",
      });
    }

    // 🔹 3. Extract token
    const token = authHeader.split(" ")[1];

    // 🔹 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔹 5. Attach user to request
    req.user = decoded;

    // 🔹 6. Continue
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid or Expired token",
    });
  }
};

module.exports = authMiddleware;