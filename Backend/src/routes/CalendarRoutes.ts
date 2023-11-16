import { Router } from "express";
const router = Router();

import * as CalendarController from "./controller/CalendarController";


router.post("/getCalendar", CalendarController.getCalendar);
router.post("/filterCalendar", CalendarController.filterCalendar);
router.post("/createEvent", CalendarController.createEvent);
router.post("/getEvent", CalendarController.getEvent);
router.post("/updateEvent", CalendarController.updateEvent);
router.post("/deleteEvent", CalendarController.deleteEvent);