import mongoose from "mongoose";
import LoanSchema, { ILoan } from "./loan.schema";

//
// 🧠 AUTO CALCULATIONS BEFORE SAVE
//
LoanSchema.pre("save", async function () {
    const loan = this as ILoan;

    // Calculate interest amount
    loan.interestAmount = (loan.amount * loan.interestRate) / 100;

    // Total payable
    loan.totalPayable = loan.amount + loan.interestAmount;

    // Remaining balance
    if (!loan.remainingBalance) {
        loan.remainingBalance = loan.totalPayable;
    }

    // Auto set due date if start date exists
    if (loan.startDate && loan.durationDays) {
        const due = new Date(loan.startDate);
        due.setDate(due.getDate() + loan.durationDays);
        loan.dueDate = due;
    }
});

export const Loan = mongoose.model<ILoan>("Loan", LoanSchema);

export class LoanService {
    static async getAll() {
        return await Loan.find().populate("client");
    }

    static async getById(id: string) {
        return await Loan.findById(id).populate("client");
    }

    static async create(data: Partial<ILoan>) {
        const amount = data.amount || 0;
        const interestRate = data.interestRate || 0;
        
        // Calculate total payable (Simple Interest for now)
        const totalPayable = amount + (amount * (interestRate / 100));
        
        data.totalPayable = totalPayable;
        data.remainingBalance = totalPayable;
        data.totalRepaid = 0;
        data.status = "pending";

        return await Loan.create(data);
    }

    static async updateStatus(id: string, status: string) {
        return await Loan.findByIdAndUpdate(id, { status }, { new: true });
    }

    static async update(id: string, data: Partial<ILoan>) {
        return await Loan.findByIdAndUpdate(id, data, { new: true });
    }

    static async delete(id: string) {
        return await Loan.findByIdAndDelete(id);
    }
}
