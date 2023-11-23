import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";
import exp from "constants";
import { EVENT_TYPE } from "../../Controler/Decorator/EVENT_TYPE";




export const getCalendar: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const eventsPromise = mainController.getCalendar();
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const filterCalendar: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if body is empty
    if(req.body.length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("filter")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body.filter !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.filter.length == 0 || (body.filter !== "Week" && body.filter !== "Year" && body.filter !== "Month")){
        res.status(400).json({msg: "Bad Request: filter is not a valid filter"});
        return;
    }

    const eventsPromise = mainController.filterCalendar(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const createEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if body is empty
    if(req.body.length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if (/*!body.hasOwnProperty("userId") ||*/ !body.hasOwnProperty("name") || !body.hasOwnProperty("description") || !body.hasOwnProperty("location") || !body.hasOwnProperty("startTime") || !body.hasOwnProperty("endTime") || !body.hasOwnProperty("date") || !body.hasOwnProperty("eventType")) {
        res.status(400).json({"name": "Error en el body"});
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
        typeof body.eventType !== "string"
    ) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify event type
    if(body.eventType !== EVENT_TYPE.MAKEUP && body.eventType !== EVENT_TYPE.DELIVERY){
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    // if(body.userId.length == 0){
    //     res.status(400).json({msg: "Bad Request: userId is not a valid id"});
    //     return;
    // }

    const eventsPromise = mainController.createEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const getEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if body is empty
    if(req.body.length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("_id")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body._id !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body._id.length == 0){
        res.status(400).json({msg: "Bad Request: eventId is not a valid id"});
        return;
    }

    const eventsPromise = mainController.getEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const updateEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if body is empty
    if(req.body.length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId") || !body.hasOwnProperty("_id") || !body.hasOwnProperty("name") || !body.hasOwnProperty("description") || !body.hasOwnProperty("location") || !body.hasOwnProperty("startTime") || !body.hasOwnProperty("endTime") || !body.hasOwnProperty("date") || !body.hasOwnProperty("eventType") || !body.hasOwnProperty("_id")) {
        res.status(400).json({"name": "Error en el body"});
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
    if (
        typeof body._id != "string" ||
        typeof body.name != "string" ||
        typeof body.description != "string" ||
        typeof body.location != "string" ||
        typeof body.eventType != "string"
    ) {
        res.status(400).json({ name: "1. Error en el body" });
        return;
    }
    
    //Verify event type
    if(body.eventType !== "Makeup" && body.eventType != "Product"){
        res.status(400).json({ name: "2. Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0 || body._id.length == 0){
        res.status(400).json({msg: "Bad Request: userId or eventId is not a valid id"});
        return;
    }

    const eventsPromise = mainController.updateEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const deleteEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if body is empty
    if(req.body.length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("_id")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body._id != "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body._id.length == 0){
        res.status(400).json({msg: "Bad Request: eventId is not a valid id"});
        return;
    }

    const eventsPromise = mainController.deleteEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const verifyOverlap: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;
    const eventsPromise = mainController.verifyOverlap(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}