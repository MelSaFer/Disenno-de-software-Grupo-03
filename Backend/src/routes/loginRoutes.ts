import { Router } from "express";
const router = Router();

import * as loginController from "./loginController"

router.post('/register', loginController.register)

router.post('/forgotPassword', loginController.forgotPassword)


export default router;