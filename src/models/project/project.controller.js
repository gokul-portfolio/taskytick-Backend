const projectService = require("./project.service");

// CREATE
exports.createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getProjects = async (req, res) => {
  try {
    const result = await projectService.getProjects(req.query);

    res.json({
      success: true,
      total: result.total,
      data: result.projects,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getProject = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.body
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};