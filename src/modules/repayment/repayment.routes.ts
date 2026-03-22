import { Router } from "express";
import { RepaymentController } from "./repayment.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", RepaymentController.getRepayments);
router.get("/:id", RepaymentController.getRepaymentById);
router.post("/", protect, RepaymentController.createRepayment);
router.put("/:id", protect, RepaymentController.updateRepayment);
router.delete("/:id", protect, RepaymentController.deleteRepayment);

export default router;
