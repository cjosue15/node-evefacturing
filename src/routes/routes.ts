import { Router } from "express";
import authRoutes from "./auth.route";
import categoryRoutes from "./category.route";
import { AuthMiddleware } from "../middlewares";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/categories", [AuthMiddleware.verifyToken], categoryRoutes);

export default router;
