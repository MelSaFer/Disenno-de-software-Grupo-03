import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";
import exp from "constants";




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
    if (!body.hasOwnProperty("userId")  || !body.hasOwnProperty("name") || !body.hasOwnProperty("description") || !body.hasOwnProperty("startTime") || !body.hasOwnProperty("endTime") || !body.hasOwnProperty("date") || !body.hasOwnProperty("eventType")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (
        typeof body.userId !== "string" ||
        typeof body.name !== "string" ||
        typeof body.description !== "string" ||
        /*!(body.startTime instanceof "string") ||
        !(body.endTime instanceof "string") ||
        !(body.date instanceof "string") ||*/
        typeof body.eventType !== "string"
    ) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify event type
    if(body.eventType !== "Makeup" && body.eventType !== "Product"){
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid id"});
        return;
    }

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
    if (!body.hasOwnProperty("eventId")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body.eventId !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.eventId.length == 0){
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
    if (!body.hasOwnProperty("userId") || !body.hasOwnProperty("eventId") || !body.hasOwnProperty("name") || !body.hasOwnProperty("description") || !body.hasOwnProperty("startTime") || !body.hasOwnProperty("endTime") || !body.hasOwnProperty("date") || !body.hasOwnProperty("eventType") || !body.hasOwnProperty("eventId")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (
        typeof body.userId !== "string" ||
        typeof body.name !== "string" ||
        typeof body.description !== "string" ||
        !(body.startTime instanceof Date) ||
        !(body.endTime instanceof Date) ||
        !(body.date instanceof Date) ||
        typeof body.eventType !== "string"
    ) {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify event type
    if(body.eventType !== "Makeup" && body.eventType !== "Product"){
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0 || body.eventId.length == 0){
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
    if (!body.hasOwnProperty("eventId")) {
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body.eventId !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.eventId.length == 0){
        res.status(400).json({msg: "Bad Request: eventId is not a valid id"});
        return;
    }

    const eventsPromise = mainController.deleteEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}