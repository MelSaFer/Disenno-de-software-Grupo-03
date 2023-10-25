import { Router } from "express";
const router = Router();

import * as imagesController from "./controller/imagesController"

router.post("/uploadImage", imagesController.uploadImage);

export default router;