import { Router } from "express";
import {
  runGrammarCheck,
  runHumanizer,
  runParaphraser,
  runPlagiarismScan
} from "../controllers/toolController.js";
import { optionalAuth } from "../middleware/auth.js";

const router = Router();

router.use(optionalAuth);
router.post("/humanizer", runHumanizer);
router.post("/paraphraser", runParaphraser);
router.post("/grammar", runGrammarCheck);
router.post("/plagiarism", runPlagiarismScan);

export default router;

