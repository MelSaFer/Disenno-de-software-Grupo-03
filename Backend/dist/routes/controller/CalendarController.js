"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOverlap = exports.deleteEvent = exports.updateEvent = exports.getEvent = exports.createEvent = exports.filterCalendar = exports.getCalendar = void 0;
const MainController_1 = require("../../Controler/Administradores/MainController");
const EVENT_TYPE_1 = require("../../Controler/Decorator/EVENT_TYPE");
const getCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const eventsPromise = mainController.getCalendar();
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.getCalendar = getCalendar;
const filterCalendar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if body is empty
    if (req.body.length == 0) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("filter")) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body.filter !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.filter.length == 0 ||
        (body.filter !== "Week" &&
            body.filter !== "Year" &&
            body.filter !== "Month")) {
        res.status(400).json({ msg: "Bad Request: filter is not a valid filter" });
        return;
    }
    const eventsPromise = mainController.filterCalendar(req.body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.filterCalendar = filterCalendar;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if body is empty
    if (req.body.length == 0) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (
    /*!body.hasOwnProperty("userId") ||*/ !body.hasOwnProperty("name") ||
        !body.hasOwnProperty("description") ||
        !body.hasOwnProperty("location") ||
        !body.hasOwnProperty("startTime") ||
        !body.hasOwnProperty("endTime") ||
        !body.hasOwnProperty("date") ||
        !body.hasOwnProperty("eventType")) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    if (
    /*typeof body.userId !== "string" ||*/
    typeof body.name !== "string" ||
        typeof body.description !== "string" ||
        typeof body.location !== "string" ||
        /*!(body.startTime instanceof "string") ||
            !(body.endTime instanceof "string") ||
            !(body.date instanceof "string") ||*/
        typeof body.eventType !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify event type
    if (body.eventType !== EVENT_TYPE_1.EVENT_TYPE.MAKEUP &&
        body.eventType !== EVENT_TYPE_1.EVENT_TYPE.DELIVERY) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    // if(body.userId.length == 0){
    //     res.status(400).json({msg: "Bad Request: userId is not a valid id"});
    //     return;
    // }
    const eventsPromise = mainController.createEvent(req.body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.createEvent = createEvent;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if body is empty
    if (req.body.length == 0) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("_id")) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body._id !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (body._id.length == 0) {
        res.status(400).json({ msg: "Bad Request: eventId is not a valid id" });
        return;
    }
    const eventsPromise = mainController.getEvent(req.body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.getEvent = getEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if body is empty
    if (req.body.length == 0) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId") ||
        !body.hasOwnProperty("_id") ||
        !body.hasOwnProperty("name") ||
        !body.hasOwnProperty("description") ||
        !body.hasOwnProperty("location") ||
        !body.hasOwnProperty("startTime") ||
        !body.hasOwnProperty("endTime") ||
        !body.hasOwnProperty("date") ||
        !body.hasOwnProperty("eventType")) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    /* if (
          typeof body._id != "string" ||
          typeof body.name != "string" ||
          typeof body.description != "string" ||
          !(body.startTime instanceof Date) ||
          !(body.endTime instanceof Date) ||
          !(body.date instanceof Date) ||
          typeof body.eventType != "string"
      ) {
          res.status(400).json({ name: "1. Error en el body" });
          return;
      } */
    if (typeof body._id != "string" ||
        typeof body.name != "string" ||
        typeof body.description != "string" ||
        typeof body.location != "string" ||
        typeof body.eventType != "string") {
        res.status(400).json({ name: "1. Error en el body" });
        return;
    }
    //Verify event type
    if (body.eventType !== EVENT_TYPE_1.EVENT_TYPE.MAKEUP &&
        body.eventType != EVENT_TYPE_1.EVENT_TYPE.DELIVERY) {
        res.status(400).json({ name: "2. Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0 || body._id.length == 0) {
        res
            .status(400)
            .json({ msg: "Bad Request: userId or eventId is not a valid id" });
        return;
    }
    const eventsPromise = mainController.updateEvent(req.body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if body is empty
    if (req.body.length == 0) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("_id")) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body._id != "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (body._id.length == 0) {
        res.status(400).json({ msg: "Bad Request: eventId is not a valid id" });
        return;
    }
    const eventsPromise = mainController.deleteEvent(req.body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.deleteEvent = deleteEvent;
const verifyOverlap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    const eventsPromise = mainController.verifyOverlap(req.body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.verifyOverlap = verifyOverlap;
