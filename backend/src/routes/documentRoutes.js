import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  listDocuments,
  updateDocument
} from "../controllers/documentController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.use(protect);
router.get("/", listDocuments);
router.post("/", createDocument);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

export default router;

