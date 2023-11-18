//import { validateSchema } from "../middlewares/validateSchema.middleware";
//import { CreateVideoSchema } from "../schema/video.schema";
import { Router } from "express";
const router = Router();

import * as userController from "./controller/UserController";

//router.get('/profile', userController.getInfo)
router.get("/getAllUsers", userController.getAllUsers);
router.post("/infoUser", userController.getInfoUser);
router.post("/getCart", userController.getCart);
router.post("/getPurchaseHistory", userController.getPurchaseHistory);

router.post("/addUser", userController.addUser);
router.post("/updateCart", userController.updateCart);

router.put("/updatePurchaseState", userController.updatePurchaseState);
router.post("/makePurchase", userController.makePurchase);

// Notifications
router.post("/getNotifications", userController.getNotifications);
router.post("/addNotification", userController.addNotification);
router.put("/updateNotificationState", userController.updateNotificationState);
router.post("/isUnread", userController.isUnread);

router.post("/test", userController.test);

export default router;
