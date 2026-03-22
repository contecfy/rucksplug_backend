import mongoose from "mongoose";
import RepaymentSchema, { IRepayment } from "./repayment.schema";

//
// 🧠 AFTER PAYMENT → UPDATE LOAN
//
RepaymentSchema.post("save", async function (doc) {
    const Loan = mongoose.model("Loan");

    const loan = await Loan.findById(doc.loan);

    if (!loan) return;

    // Update total repaid
    loan.totalRepaid += doc.amount;

    // Update remaining balance
    loan.remainingBalance = (loan as any).totalPayable - loan.totalRepaid;

    // Update status
    if (loan.remainingBalance <= 0) {
        loan.status = "completed";
        loan.remainingBalance = 0;
    } else {
        loan.status = "ongoing";
    }

    await loan.save();
});

export const Repayment = mongoose.model<IRepayment>("Repayment", RepaymentSchema);

export class RepaymentService {
    static async getAll() {
        return await Repayment.find().populate("loan client");
    }

    static async getById(id: string) {
        return await Repayment.findById(id).populate("loan client");
    }

    static async create(data: Partial<IRepayment>) {
        return await Repayment.create(data);
    }

    static async update(id: string, data: Partial<IRepayment>) {
        return await Repayment.findByIdAndUpdate(id, data, { new: true });
    }

    static async delete(id: string) {
        return await Repayment.findByIdAndDelete(id);
    }
}
