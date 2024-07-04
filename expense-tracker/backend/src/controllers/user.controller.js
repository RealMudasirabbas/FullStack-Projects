import { userModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const loggedInUser = await userModel.findById(userId);
        const accessToken = loggedInUser.generateAccessToken();
        const refreshToken = loggedInUser.generateRefreshToken();
        loggedInUser.refreshToken = refreshToken;
        await loggedInUser.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError("Error ocuure while generating tokens",error)
    }
};

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await userModel.findOne({ email });

    if (existedUser) {
        throw new ApiError(
            403,
            "This email is either already taken or you already have an account",
        );
    }

    const user = await userModel.create({
        username,
        email,
        password,
    });

    if (!user) {
        throw new ApiError(500, "Error occured while registering the user");
    }

    const createdUser = await userModel.findOne({ email }).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "User not found");
    }

    return res.json(
        new ApiResponse(200, "User registered successfully", createdUser),
    );
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    if ([email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new ApiError(501, "User not found");
    }

    const checkPassword = user.isPasswordCorrect(password);

    if (!checkPassword) {
        throw new ApiError(403, "Invalid Password");
    }

    const loggedInUser = await userModel.findById(user._id).select("-password -refreshToken");
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            "User loggedIn successfully",
            {
            user: loggedInUser,accessToken,refreshToken
            }
        )
    )
}
//TODO: create logout functionality later with verifyJWT middleware
export async function logoutUser(){}
