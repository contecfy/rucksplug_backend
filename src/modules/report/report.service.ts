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
        const Investment = mongoose.model("Investment");
        const Repayment = mongoose.model("Repayment");

        const loanStats = await Loan.aggregate([
            { $group: { _id: null, totalLent: { $sum: "$amount" }, count: { $count: {} } } }
        ]);

        const investmentStats = await Investment.aggregate([
            { $group: { _id: null, totalInvested: { $sum: "$amount" } } }
        ]);

        const repaymentStats = await Repayment.aggregate([
            { $group: { _id: null, totalRepaid: { $sum: "$amount" } } }
        ]);

        return {
            totalLent: loanStats[0]?.totalLent || 0,
            totalInvested: investmentStats[0]?.totalInvested || 0,
            totalRepaid: repaymentStats[0]?.totalRepaid || 0,
            loanCount: loanStats[0]?.count || 0,
            timestamp: new Date()
        };
    }
}
