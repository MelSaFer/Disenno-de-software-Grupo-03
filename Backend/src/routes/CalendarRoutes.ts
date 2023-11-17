import { Router } from "express";
const router = Router();

import * as CalendarController from "./controller/CalendarController";


router.post("/getCalendar", CalendarController.getCalendar);
router.post("/filterCalendar", CalendarController.filterCalendar);
router.post("/createEvent", CalendarController.createEvent);
router.post("/getEvent", CalendarController.getEvent);
router.put("/updateEvent", CalendarController.updateEvent);
router.delete("/deleteEvent", CalendarController.deleteEvent);
router.post("/verifyOverlap", CalendarController.verifyOverlap);

export default router;