const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 REGISTER
const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  // check existing user
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

// 🔹 LOGIN (FINAL FIXED)
const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.password) {
    throw new Error("Password not found for user");
  }

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // 🔥 IMPORTANT FIX → include name & email in token
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,       // ✅ ADD
      email: user.email,     // ✅ ADD
      role: user.role || "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  register,
  login,
};