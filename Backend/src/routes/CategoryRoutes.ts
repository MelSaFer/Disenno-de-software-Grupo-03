import { Router } from "express";
const router = Router();

import * as categoryController from "./controller/CategoryController"

router.post("/add/:name", categoryController.addCategory);
router.delete("/delete:/id", categoryController.deleteCategory);
router.put("/update/:id/:name", categoryController.updateCategory);
router.get("/get/:id", categoryController.getCategoryById);
router.get("/get", categoryController.getAllCategories);

router.get("/get/:id", categoryController.getSubCategories);
router.post("/add/:id", categoryController.addSubCategory);
router.delete("/delete/:id", categoryController.deleteSubCategory);
router.put("/update/:id/:name", categoryController.updateSubCategory);


export default router;