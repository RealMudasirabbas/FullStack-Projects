import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            minLength: [5, "username must be atleast 5 characters long"],
            maxLength: [50, "username must not exceed over 50 characters"],
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
            minLength: [8, "password must be atleast 5 characters long"],
            maxLength: [25, "password must not exceed over 50 characters"],
        },

        refreshToken: {
            type: String,
        },
    },

    {
        timestamps: true,
    },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified(this.password)) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.JWT_SECRET_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET_TOKEN,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    );
};
export const userModel = mongoose.model("User", userSchema);
