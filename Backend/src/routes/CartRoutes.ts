import { Router } from "express";
const router = Router();

import * as cartController from "./controller/CartController"

router.post("/add/:id", cartController.addProductToCart);
router.get("/get", cartController.loadCart);
router.delete("/delete/:id", cartController.deleteProductFromCart);
router.put("/update/:id/:quantity", cartController.updateProductFromCart);


export default router;