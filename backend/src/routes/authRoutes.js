import { Router } from "express";
import { me, syncUser } from "../controllers/authController.js";
import { protect, requireClerkAuth } from "../middleware/auth.js";

const router = Router();

router.post("/sync", requireClerkAuth, syncUser);
router.get("/me", protect, me);

export default router;
