const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

const signUp = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.status(201).json({
      _id: newUser?._id,
      userName: newUser?.userName,
      email: newUser?.email,
      token: generateToken(newUser?._id),
    });
  } else {
    res.status(409);
    throw new Error("User With This Email Or Phone-Number Already Exists");
  }
});

// Login a user
const login = asyncHandler(async (req, res) => {
  const { emailOrPhone, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
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
