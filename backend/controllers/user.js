const User = require("../model/user");
const asyncHandler = require("express-async-handler");

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const getaUser = await User.findById(id);
    if (!getaUser) {
      const error = new Error("User not found with this email");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllUser,
  getAUser,
};
