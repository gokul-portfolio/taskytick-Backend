const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async ({ email, password }) => {
  // 1. find user
  const user = await User.findOne({ email });

  // 🔥 unified error (security)
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. check password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. create token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 4. return response
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};
module.exports = { login };