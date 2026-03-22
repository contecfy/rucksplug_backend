/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - title
 *         - type
 *         - generatedBy
 *       properties:
 *         title:
 *           type: string
 *         type:
 *           type: string
 *           enum: [financial, user_activity, loan_performance, investment_summary]
 *         data:
 *           type: object
 *           description: JSON data containing the report results
 *         generatedBy:
 *           type: string
 *           description: User ID who generated the report
 */
import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
    title: string;
    type: "financial" | "user_activity" | "loan_performance" | "investment_summary";
    data: any;
    generatedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ReportSchema: Schema<IReport> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["financial", "user_activity", "loan_performance", "investment_summary"],
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            default: {},
        },
        generatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default ReportSchema;
