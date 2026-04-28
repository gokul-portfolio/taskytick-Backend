const authService = require("./auth.service");

// 🔐 REGISTER
exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// 🔐 LOGIN
exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// ✅ GET CURRENT USER (/auth/me)
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user, // 🔥 middleware la irundhu varum
    });
  } catch (err) {
    next(err);
  }
};