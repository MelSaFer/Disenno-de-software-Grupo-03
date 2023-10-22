import { Router } from "express";
const router = Router();

import * as StoreController from "./controller/StoreController"

//Add products to the store
router.get('/getCatalogue', StoreController.getCatalogue)
//Update a product from the store
router.put('/updateProduct', StoreController.updateProduct)
//Consult a product from the store
router.get('/getProduct', StoreController.getProduct)
//Delete a product from the store
router.delete('/deleteProduct', StoreController.deleteProduct)

export default router;