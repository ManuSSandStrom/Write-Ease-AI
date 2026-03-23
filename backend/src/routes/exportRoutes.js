import { Router } from "express";
import { exportContent } from "../controllers/exportController.js";
import { optionalAuth } from "../middleware/auth.js";

const router = Router();

router.use(optionalAuth);
router.post("/", exportContent);

export default router;

