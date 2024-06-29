import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


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

export const userModel = mongoose.model("User", userSchema);
