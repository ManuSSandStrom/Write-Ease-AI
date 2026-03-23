import { Router } from "express";
import {
  enhanceResume,
  getResume,
  saveResume
} from "../controllers/resumeController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", getResume);
router.post("/", saveResume);
router.put("/:id", saveResume);
router.post("/enhance", enhanceResume);

export default router;

