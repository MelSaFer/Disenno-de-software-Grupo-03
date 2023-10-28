import { Router } from "express";
const router = Router();

import * as StoreController from "./controller/StoreController";

//Add products to the store
router.get("/getCatalogue", StoreController.getCatalogue);
//Update a product from the store
router.put("/updateProduct", StoreController.updateProduct);
//Consult a product from the store
router.post("/getProduct", StoreController.getProduct);
//Delete a product from the store
router.delete("/deleteProduct", StoreController.deleteProduct);
//Create a new product in the store
router.post("/addProduct", StoreController.addProduct);
//Consult a product from the store by the name of the product
router.post("/getProductByName", StoreController.getProductByName);

export default router;
