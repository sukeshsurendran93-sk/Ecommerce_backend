import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/allorders", protect, authorizeAdmin, getAllOrders);

export default router;
