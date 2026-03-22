import { Router } from "express";
import { InvestmentController } from "./investment.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", InvestmentController.getInvestments);
router.get("/:id", InvestmentController.getInvestmentById);
router.post("/", protect, InvestmentController.createInvestment);
router.put("/:id", protect, InvestmentController.updateInvestment);
router.delete("/:id", protect, InvestmentController.deleteInvestment);

export default router;
