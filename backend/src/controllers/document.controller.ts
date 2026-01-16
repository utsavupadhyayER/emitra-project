import { Request, Response } from "express";
import Document from "../models/Document";

/**
 * ✅ ADMIN: Upload document
 * POST /api/documents/upload
 */
export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { title, category } = req.body;

    if (!req.file || !title) {
      return res.status(400).json({ message: "Title and file are required" });
    }

    const document = await Document.create({
      title,
      category,
      fileName: req.file.filename,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: "Document upload failed" });
  }
};

/**
 * 🌐 PUBLIC: Get all documents
 * GET /api/documents
 */
export const getDocuments = async (_req: Request, res: Response) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch {
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};
