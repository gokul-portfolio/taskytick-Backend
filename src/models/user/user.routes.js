const express = require("express");
const router = express.Router();

const { login } = require("./user.controller");
const validate = require("../../middleware/validate.middleware");

// 🔐 LOGIN
router.post("/login", validate, login);

module.exports = router;