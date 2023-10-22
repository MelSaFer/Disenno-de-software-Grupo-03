import { Router } from "express";
const router = Router();

import * as categoryController from "./controller/CategoryController"

router.post("/addCategory", categoryController.addCategory);
router.delete("/deleteCategory", categoryController.deleteCategory);
router.put("/updateCategory", categoryController.updateCategory);
router.get("/getCategory", categoryController.getCategory);
router.get("/getSubcategories", categoryController.getSubCategories);
router.post("/addSubcategory", categoryController.addSubCategory);
router.delete("/deleteSubcategory", categoryController.deleteSubCategory);
router.put("/updateSubcategory", categoryController.updateSubCategory);
router.get("/getCategories", categoryController.getCategories);


export default router;