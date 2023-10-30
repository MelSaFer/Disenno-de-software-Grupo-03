import { Router } from "express";
const router = Router();

import * as galeryController from "./controller/GaleryController";

router.post("/addContent", galeryController.addContent);
router.delete("/deleteContent", galeryController.deleteContent);
router.put("/updateContent", galeryController.updateContent);

router.post("/getContent", galeryController.getContentById);
router.post("/getFilteredContent", galeryController.getFilteredContent);
router.post("/getFilteredSubcategory", galeryController.getFilteredSubcontent);
router.get("/getAllContent", galeryController.getAllContent);
router.get("/getQuantity", galeryController.getContentQuantity);

export default router;
