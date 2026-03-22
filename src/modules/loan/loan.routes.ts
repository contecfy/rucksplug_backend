import { Router } from "express";
import { LoanController } from "./loan.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", LoanController.getLoans);
router.get("/:id", LoanController.getLoanById);
router.post("/", protect, LoanController.createLoan);
router.patch("/:id/approve", protect, LoanController.approveLoan);
router.put("/:id", protect, LoanController.updateLoan);
router.delete("/:id", protect, LoanController.deleteLoan);

export default router;
