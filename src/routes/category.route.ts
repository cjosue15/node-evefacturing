import { Router } from "express";

import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
} from "../controllers";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);
router.get("/:id", getCategory);

export default router;
