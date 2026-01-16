import { Router } from "express";
import {
  uploadDocument,
  getDocuments,
} from "../controllers/document.controller";
import { upload } from "../middleware/upload.middleware";
import { protectAdmin } from "../middleware/auth.middleware";

const router = Router();

/**
 * 🌐 Public – list documents
 */
router.get("/", getDocuments);

/**
 * 🔒 Admin only – upload document
 */
router.post(
  "/upload",
  protectAdmin,
  upload.single("file"),
  uploadDocument
);

export default router;
