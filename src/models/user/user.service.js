const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("./user.model");

// ================= CREATE =================
const createUser = async (data) => {
  let {
    name,
    email,
    phone,
    department,
    address,
    password,
    isActive,
    grantAdminAccess,
  } = data;

  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  email = email.toLowerCase().trim();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  let finalPassword = password;
  if (!finalPassword) {
    finalPassword = crypto.randomBytes(4).toString("hex");
  }

  const hashedPassword = await bcrypt.hash(finalPassword, 10);

  const role = grantAdminAccess ? "admin" : "user";
  const activeStatus = isActive ?? true;

  const user = await User.create({
    name: name.trim(),
    email,
    phone,
    department,
    address,
    password: hashedPassword,
    role,
    isActive: activeStatus,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tempPassword: finalPassword,
  };
};

// ================= GET ALL =================
const getUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

// ================= GET ONE =================
const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// ================= UPDATE =================
const updateUser = async (id, data) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  // optional email normalize
  if (data.email) {
    data.email = data.email.toLowerCase().trim();
  }

  // password update (if provided)
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  // role mapping
  if (data.grantAdminAccess !== undefined) {
    data.role = data.grantAdminAccess ? "admin" : "user";
  }

  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedUser;
};

// ================= DELETE =================
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return true;
};

// ✅ EXPORT ALL
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};