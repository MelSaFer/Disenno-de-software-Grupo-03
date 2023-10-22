//import { validateSchema } from "../middlewares/validateSchema.middleware";
//import { CreateVideoSchema } from "../schema/video.schema";
import { Router } from "express";
const router = Router();

import * as userController from "./controller/UserController"

//router.get('/profile', userController.getInfo)
router.get('/infoUser', userController.getInfoUser)
router.post('/updateCart', userController.updateCart)


export default router;