import { Router } from "express";
const router = Router();

import * as storeController from "./controller/StoreController"


router.get("/get", storeController.loadCatalogue);
router.get("/get/:id", storeController.getProductById);
router.post("/add/:name/:description/:date/:image/:tags", storeController.addProduct);
router.put("/update/:id/:name/:description/:date/:image/:tags", storeController.updateProduct);
router.delete("/delete/:id", storeController.deleteProduct);
router.get("/getAvailability", storeController.getAvailability);

export default router;