const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const signUp = asyncHandler(async (req, res) => {
  const { email, userName } = req.body;
  const findUser = await User.findOne({
    $or: [{ email: email }, { userName: userName }],
  });
  if (findUser) {
    res.status(409);
    throw new Error("User With This Email Or Username Already Exists");
  } else {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({
        _id: newUser?._id,
        userName: newUser?.userName,
        email: newUser?.email,
        token: generateToken(newUser?._id),
      });
    } catch (error) {
      throw new Error("Something went wrong, Please try again ");
    }
  }
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({
    $or: [{ email: emailOrUsername }, { phone: emailOrUsername }],
  });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      userName: findUser?.userName,
      email: findUser?.email,
      token: generateToken(findUser?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  signUp,
  login,
};
