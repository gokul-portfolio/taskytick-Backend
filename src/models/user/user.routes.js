const express = require("express");
const router = express.Router();

// ✅ CONTROLLERS
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./user.controller");

// ✅ MIDDLEWARES
const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

// ================= CREATE =================
// 👤 CREATE USER (ADMIN ONLY)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createUser
);

// ================= READ =================
// 📋 GET ALL USERS
router.get(
  "/",
  authMiddleware,
  getUsers
);

// 🔍 GET SINGLE USER
router.get(
  "/:id",
  authMiddleware,
  getUserById
);

// ================= UPDATE =================
// ✏️ UPDATE USER (ADMIN ONLY)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateUser
);

// ================= DELETE =================
// ❌ DELETE USER (ADMIN ONLY)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

module.exports = router;