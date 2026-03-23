import { Router } from "express";
import {
  getSubscription,
  updateSubscription
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", getSubscription);
router.post("/", updateSubscription);

export default router;

