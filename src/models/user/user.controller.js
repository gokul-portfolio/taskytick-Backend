const { login } = require("./user.service");

const loginController = async (req, res, next) => {
  try {
    const data = await login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login: loginController,
};