const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./user.service");
const User = require("./user.model")
// ================= CREATE =================
const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// ================= GET ALL =================
const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};



// ================= GET PROFILE =================
const getProfileController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    next(err)
  }
}



// ================= GET ONE =================
const getUserByIdController = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// ================= UPDATE =================
const updateUserController = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// ================= DELETE =================
const deleteUserController = async (req, res, next) => {
  try {
    await deleteUser(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// ✅ EXPORT ALL
module.exports = {
  createUser: createUserController,
  getUsers: getUsersController,
  getUserById: getUserByIdController,
  updateUser: updateUserController,
  deleteUser: deleteUserController,
  getProfile: getProfileController,
};