import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import validator from "validator";

// Helper to safely delete temp files from disk
const deleteTempFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // 1. EXTRACT DATA: Get text fields sent from the frontend/Postman body
  const { fullName, email, username, password } = req.body;

  // 2. FILE PATH EXTRACTION: Done early so we can clean up on ANY validation failure
  // Multer already saved these to disk before the controller even started
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // 3. TEXT VALIDATION: Check if any required field is missing or empty
  if (
    [fullName, email, username, password].some(
      (field) => !field || field?.trim() === ""
    )
  ) {
    deleteTempFile(avatarLocalPath);
    deleteTempFile(coverImageLocalPath);
    throw new ApiError(400, "All fields are required");
  }

  // 4. EMAIL SYNTAX VALIDATION: Verify email structure using validator package

  if (!validator.isEmail(email)) {
    deleteTempFile(avatarLocalPath);
    deleteTempFile(coverImageLocalPath);
    throw new ApiError(400, "Invalid email");
  }

  // 5. DUPLICATE CHECK: Check if user with same username OR email already exists
  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });
  if (existedUser) {
    deleteTempFile(avatarLocalPath);
    deleteTempFile(coverImageLocalPath);
    throw new ApiError(409, "User with email or username already exists");
  }

  // 6. REQUIRED FILE VALIDATION: Avatar is strictly mandatory
  if (!avatarLocalPath) {
    deleteTempFile(coverImageLocalPath);
    throw new ApiError(400, "Avatar file is required");
  }

  // 7. CLOUD UPLOAD: Upload files to Cloudinary
  // Note: uploadOnCloudinary already handles disk cleanup after upload (success or fail)
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  let coverImage;

  if (coverImageLocalPath) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
  }

  // 8. CLOUD UPLOAD VALIDATION: Confirm avatar was uploaded successfully
  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar to cloud storage");
  }

  // 9. DATABASE CREATION: Save new user to MongoDB
  // Password is auto-hashed by the pre-save hook in User model
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    username: username.toLowerCase(),
    email,
  });

  // 10. SANITIZE DATA: Fetch created user without sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // 11. CREATION CHECK: Confirm user document exists in DB
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // 12. CLIENT RESPONSE: Send 201 Created with sanitized user data
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //send access and  refresh token in cookie
  //send response

  const { email, username, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "Username/email and password are required");
  }

  const user = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

export { registerUser, loginUser };
