const Task = require("./task.model");

// ================= CREATE =================
const createTask = async (data, userId) => {
  return await Task.create({
    ...data,
    createdBy: userId,
  });
};

// ================= GET ALL (ROLE BASED) =================
const getTasks = async (user) => {

  // ✅ ADMIN → ALL TASKS
  if (user.role === "admin") {
    return await Task.find()
      .populate("assignedTo", "name email department")
      .sort({ createdAt: -1 });
  }

  // ✅ NORMAL USER → ONLY THEIR TASKS
  return await Task.find({
    assignedTo: user.id,
  })
    .populate("assignedTo", "name email department")
    .sort({ createdAt: -1 });
};

// ================= GET ONE =================
const getTaskById = async (id) => {
  return await Task.findById(id).populate(
    "assignedTo",
    "name email department"
  );
};

// ================= UPDATE =================
const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("assignedTo", "name email department");
};

// ================= DELETE =================
const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};