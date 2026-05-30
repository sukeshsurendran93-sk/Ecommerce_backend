import { Router } from "express";
import { getUserProfile, updateProfile } from "../controllers/userProfile.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, getUserProfile);
router.put("/", protect, updateProfile);

export default router;