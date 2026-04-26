const Task = require("./task.model");

// CREATE
const createTask = async (data, userId) => {
  return await Task.create({
    ...data,
    createdBy: userId,
  });
};

// GET ALL
const getTasks = async (userId) => {
  return await Task.find({ createdBy: userId })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });
};

// GET SINGLE
const getTaskById = async (id) => {
  return await Task.findById(id).populate("assignedTo");
};

// UPDATE
const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// DELETE
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