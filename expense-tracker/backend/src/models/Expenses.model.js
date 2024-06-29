import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
    {
        expenseName: {
            type: String,
            required: [true, "Expense name is required"],
            trim: true,
            lowercase: true,
        },
        expenseAmount: {
            type: Number,
            required: [true, "Expense amount is required"],
            trim: true,
        },
        expenseDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
);

export const expenseModel = mongoose.model("Expenses", expenseSchema);
