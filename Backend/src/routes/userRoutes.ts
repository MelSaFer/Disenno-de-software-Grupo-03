//import { validateSchema } from "../middlewares/validateSchema.middleware";
//import { CreateVideoSchema } from "../schema/video.schema";
import { Router } from "express";
const router = Router();

import * as userController from "./controller/UserController"

//router.get('/profile', userController.getInfo)
router.get('/infoUser', userController.getInfoUser)
router.get('/getCart', userController.getCart)
router.get('/getPurchaseHistory', userController.getPurchaseHistory)

router.post('/updateCart', userController.updateCart)

router.put('/updatePurchaseState', userController.updatePurchaseState)



export default router;