const router = require("express").Router();
const ctrl = require("./auth.controller");
const authMiddleware = require("../../middleware/auth.middleware"); // ✅ add this

// 🔐 LOGIN
router.post("/login", ctrl.login);

// ✅ GET CURRENT USER (/auth/me)
router.get("/me", authMiddleware, ctrl.getCurrentUser);

module.exports = router;