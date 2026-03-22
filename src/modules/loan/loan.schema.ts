/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - client
 *         - amount
 *         - interestRate
 *         - durationDays
 *       properties:
 *         client:
 *           type: string
 *         amount:
 *           type: number
 *         interestRate:
 *           type: number
 *         durationDays:
 *           type: number
 *         status:
 *           type: string
 *           enum: [pending, approved, ongoing, completed, defaulted]
 *         purpose:
 *           type: string
 */
import mongoose, { Schema, Document } from "mongoose";

export interface ILoan extends Document {
    client: mongoose.Types.ObjectId;

    amount: number;
    interestRate: number; // percentage (e.g. 20)
    interestAmount: number;

    totalPayable: number;

    durationDays: number;

    startDate: Date;
    dueDate: Date;

    status: "pending" | "approved" | "ongoing" | "completed" | "defaulted";

    totalRepaid: number;
    remainingBalance: number;

    purpose?: string;

    createdAt: Date;
    updatedAt: Date;
}

const LoanSchema: Schema<ILoan> = new Schema(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        interestRate: {
            type: Number,
            required: true,
        },

        interestAmount: {
            type: Number,
            required: true,
        },

        totalPayable: {
            type: Number,
            required: true,
        },

        durationDays: {
            type: Number,
            required: true,
        },

        startDate: {
            type: Date,
        },

        dueDate: {
            type: Date,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "ongoing", "completed", "defaulted"],
            default: "pending",
        },

        totalRepaid: {
            type: Number,
            default: 0,
        },

        remainingBalance: {
            type: Number,
        },

        purpose: String,
    },
    {
        timestamps: true,
    }
);

export default LoanSchema;