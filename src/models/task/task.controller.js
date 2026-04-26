const taskService = require("./task.service");

// CREATE
const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.id);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ONE
const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateTask = async (req, res) => {
  try {
    const updated = await taskService.updateTask(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Task updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);

    res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};