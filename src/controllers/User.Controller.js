import ApiSuccess from "../utils/ApiSuccess.js";
import ApiError from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/User.Model.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
};

export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
  }
  
  res
    .status(201)
    .json(new ApiSuccess(201, data, "User registered successfully"));
});

export const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    throw new ApiError(400, "No Such User");
  }

  const isValid = await existingUser.comparePassword(password);

  if (!isValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { refreshToken, accessToken } =
    await existingUser.accessToken_refreshToken();

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  const user = {
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    token: accessToken,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(new ApiSuccess(201, user, "User loggedin successfully"));
});

export const refreshToken = AsyncHandler(async (req, res) => {
  const  refreshToken  = req.cookies?.refreshToken || req.header("refresh-token");

  if (!refreshToken) {
    throw new ApiError(401, "Not Authorized");
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id).select("+refreshToken");

  if (!user) {
    throw new ApiError(400, "User Not found");
  }


  if (user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Un-Authorised");
  }

  const token = await user.accessToken_refreshToken();
  user.refreshToken = token.refreshToken
  await user.save();

  res
    .cookie("accessToken", token.accessToken, options)
    .cookie("refreshToken", token.refreshToken, options)
    .status(201)
    .json(new ApiSuccess(201,token,"Tokens generated successfully"));
});

export const userProfile = AsyncHandler(async (req, res) => {
  const user = req.user;

  const existingUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!existingUser) {
    throw new ApiError(401, "User does not exist");
  }

  res
    .status(200)
    .json(
      new ApiSuccess(200, existingUser, "User profile fetched successfully")
    );
});

export const adminProfile = AsyncHandler(async (req, res) => {
  const user = req.user;

  const existingUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!existingUser) {
    throw new ApiError(401, "User does not exist");
  }

  res
    .status(200)
    .json(
      new ApiSuccess(200, existingUser, "User profile fetched successfully")
    );
});

export const logout = AsyncHandler(async (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiSuccess(200, null, "Logged out successfully"));
});