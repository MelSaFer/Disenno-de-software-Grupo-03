import { Router } from "express";
const router = Router();

import * as loginController from "./loginController"

router.post('/register', (req: any, res: any) => loginController.register)

router.post('/forgotPassword', (req: any, res: any) => loginController.forgotPassword)


export default router;