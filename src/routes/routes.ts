import { Router } from "express";
import authRoutes from "./auth.route";

const router = Router();

router.use("/api/auth", authRoutes);

export default router;
