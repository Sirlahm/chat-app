const User = require("../model/user");
const Message = require("../model/message");
const asyncHandler = require("express-async-handler");

const getAllUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const getUsers = await User.find({ _id: { $ne: _id } });
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

const getUsersMessages = asyncHandler(async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const getMessages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(getMessages);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAllUser,
  getAUser,
  getUsersMessages,
};
