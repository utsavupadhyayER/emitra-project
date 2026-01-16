import { Router } from "express";
import { createRequest} from "../controllers/request.controller";

const router = Router();

router.post("/", createRequest);
// router.get("/track", trackRequest);

export default router;
