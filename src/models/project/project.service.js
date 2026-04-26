const Project = require("./project.model");

// CREATE
const createProject = async (data) => {
  return await Project.create(data);
};

// GET ALL (with pagination + search optional)
const getProjects = async (query) => {
  const { page = 1, limit = 10, search = "" } = query;

  const filter = {
    name: { $regex: search, $options: "i" },
  };

  const projects = await Project.find(filter)
    .populate("projectManager")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Project.countDocuments(filter);

  return { projects, total };
};

// GET BY ID
const getProjectById = async (id) => {
  return await Project.findById(id).populate("projectManager");
};

// UPDATE
const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// DELETE
const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};