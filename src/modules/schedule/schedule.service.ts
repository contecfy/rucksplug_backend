import mongoose from "mongoose";
import ScheduleSchema, { ISchedule } from "./schedule.schema";

export const Schedule = mongoose.model<ISchedule>("Schedule", ScheduleSchema);

export class ScheduleService {
    static async create(data: Partial<ISchedule>) {
        return await Schedule.create(data);
    }

    static async getByLoanId(loanId: string) {
        return await Schedule.find({ loan: loanId }).sort({ dueDate: 1 });
    }

    static async updateStatus(id: string, status: string, paidAmount?: number) {
        const update: any = { status };
        if (paidAmount !== undefined) {
            update.paidAmount = paidAmount;
        }
        return await Schedule.findByIdAndUpdate(id, update, { new: true });
    }

    /**
     * Helper to generate a repayment schedule based on loan details
     */
    static async generateSchedule(loanId: string, totalPayable: number, durationDays: number, startDate: Date) {
        const installmentCount = Math.ceil(durationDays); // Assuming daily for now, can be adjusted
        const dailyAmount = totalPayable / installmentCount;

        const schedules = [];
        for (let i = 1; i <= installmentCount; i++) {
            const dueDate = new Date(startDate);
            dueDate.setDate(dueDate.getDate() + i);

            schedules.push({
                loan: loanId,
                dueDate,
                expectedAmount: dailyAmount,
                status: "pending",
            });
        }

        return await Schedule.insertMany(schedules);
    }
}
