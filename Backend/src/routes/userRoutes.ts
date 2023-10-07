import { Router } from "express";
const router = Router();

import * as userController from "./userController"

router.get('/profile', (req: any, res: any) => userController.getInfo)

export default router;