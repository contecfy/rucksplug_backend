import { Router } from "express";
import { CollateralController } from "./collateral.controller";

const router = Router();

router.get("/", CollateralController.getCollaterals);
router.get("/:id", CollateralController.getCollateralById);
router.post("/", CollateralController.createCollateral);
router.put("/:id", CollateralController.updateCollateral);
router.delete("/:id", CollateralController.deleteCollateral);

export default router;
