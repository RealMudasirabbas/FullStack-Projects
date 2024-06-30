import userModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
}
