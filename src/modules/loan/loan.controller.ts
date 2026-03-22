import { Request, Response } from "express";
import { LoanService } from "./loan.service";

export class LoanController {
    /**
     * @swagger
     * /loans:
     *   get:
     *     summary: Get all loans
     *     tags: [Loans]
     *     responses:
     *       200:
     *         description: List of loans
     */
    static async getLoans(req: Request, res: Response) {
        try {
            const loans = await LoanService.getAll();
            res.json(loans);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /loans/{id}:
     *   get:
     *     summary: Get loan by ID
     *     tags: [Loans]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Loan found
     */
    static async getLoanById(req: Request, res: Response) {
        try {
            const loan = await LoanService.getById(req.params.id as string);
            if (!loan) return res.status(404).json({ message: "Loan not found" });
            res.json(loan);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /loans:
     *   post:
     *     summary: Create a new loan
     *     tags: [Loans]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Loan'
     *     responses:
     *       201:
     *         description: Loan created
     */
    static async createLoan(req: Request, res: Response) {
        try {
            const loan = await LoanService.create(req.body);
            res.status(201).json(loan);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateLoan(req: Request, res: Response) {
        try {
            const loan = await LoanService.update(req.params.id as string, req.body);
            if (!loan) return res.status(404).json({ message: "Loan not found" });
            res.json(loan);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteLoan(req: Request, res: Response) {
        try {
            const loan = await LoanService.delete(req.params.id as string);
            if (!loan) return res.status(404).json({ message: "Loan not found" });
            res.json({ message: "Loan deleted" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * @swagger
     * /loans/{id}/approve:
     *   patch:
     *     summary: Approve a loan
     *     tags: [Loans]
     *     responses:
     *       200:
     *         description: Loan approved
     */
    static async approveLoan(req: Request, res: Response) {
        try {
            const loan = await LoanService.updateStatus(req.params.id as string, "ongoing");
            if (!loan) return res.status(404).json({ message: "Loan not found" });
            res.json(loan);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
