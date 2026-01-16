import { Request, Response } from "express";
import Contact from "../models/Contact";

export const createContact = async (req: Request, res: Response) => {
  const { name, mobile, message } = req.body;

  if (!name || !mobile || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await Contact.create({ name, mobile, message });

  res.status(201).json({ message: "Message sent successfully" });
};
