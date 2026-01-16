import { Router } from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller";
import { protectAdmin } from "../middleware/auth.middleware";

const router = Router();

// Run ONCE to create admin
router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);

// Test protected route
router.get("/me", protectAdmin, (_req, res) => {
  res.json({ message: "Admin authorized" });
});

export default router;
