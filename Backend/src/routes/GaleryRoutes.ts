import { Router } from "express";
const router = Router();

import * as galeryController from "./controller/GaleryController"

router.post("/add/:name/:description/:date/:image/:tags", galeryController.addContent);
router.delete("/delete/:id", galeryController.deleteContent);
router.put("/update/:name/:description/:date/:image/:tags", galeryController.updateContent);

router.get("/getContent/:id", galeryController.getContentById);
router.get("/getFilteredCategory/:categoryId", galeryController.getFilteredContent);
router.get("/getFilteredSubcategory/:subcategoryId", galeryController.getFilteredSubcontent);
router.get("/get", galeryController.getAllContent);
router.get("/getQuantity/:categoryId/:subcategoryId", galeryController.getContentQuantity);

export default router;