import { Router } from "express";
import { getRecommendations } from "../controllers/analyticsController.js";

const router = Router();

router.get("/", getRecommendations);

export default router;