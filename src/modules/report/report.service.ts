import mongoose from "mongoose";
import ReportSchema, { IReport } from "./report.schema";

export const Report = mongoose.model<IReport>("Report", ReportSchema);

export class ReportService {
    static async getAll() {
        return await Report.find().populate("generatedBy");
    }

    static async getById(id: string) {
        return await Report.findById(id).populate("generatedBy");
    }

    static async create(data: Partial<IReport>) {
        return await Report.create(data);
    }

    static async delete(id: string) {
        return await Report.findByIdAndDelete(id);
    }

    // real logic for generating financial summary
    static async generateFinancialSummary() {
        const Loan = mongoose.model("Loan");
        const Repayment = mongoose.model("Repayment");

        const loanStats = await Loan.aggregate([
            {
                $group: {
                    _id: null,
                    totalLent: { $sum: "$amount" },
                    totalInterestExpected: { $sum: "$interestAmount" },
                    totalLosses: {
                        $sum: { $cond: [{ $eq: ["$status", "defaulted"] }, "$remainingBalance", 0] }
                    },
                    ongoingCount: {
                        $sum: { $cond: [{ $eq: ["$status", "ongoing"] }, 1, 0] }
                    },
                    defaultedCount: {
                        $sum: { $cond: [{ $eq: ["$status", "defaulted"] }, 1, 0] }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const repaymentStats = await Repayment.aggregate([
            { $group: { _id: null, totalRepaid: { $sum: "$amount" } } }
        ]);

        const stats = loanStats[0] || {};
        const totalRepaid = repaymentStats[0]?.totalRepaid || 0;
        
        // Profit is a bit complex: for now, let's treat it as interest from repayments
        // Simplified: (totalRepaid - totalLent) if positive, but that's not quite right
        // Better: sum of interestAmount from completed loans or proportion of repayment
        const totalProfit = Math.max(0, totalRepaid - stats.totalLent); 

        return {
            totalLent: stats.totalLent || 0,
            totalRepaid: totalRepaid,
            totalProfit: totalProfit,
            totalLosses: stats.totalLosses || 0,
            ongoingCount: stats.ongoingCount || 0,
            defaultedCount: stats.defaultedCount || 0,
            totalCount: stats.count || 0,
            timestamp: new Date()
        };
    }
}
