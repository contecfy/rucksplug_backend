import { Router } from "express";
import { ReportController } from "./report.controller";

const router = Router();

router.get("/", ReportController.getReports);
router.get("/generate/financial", ReportController.generateSummary);
router.get("/:id", ReportController.getReportById);
router.post("/", ReportController.createReport);
router.delete("/:id", ReportController.deleteReport);

export default router;
