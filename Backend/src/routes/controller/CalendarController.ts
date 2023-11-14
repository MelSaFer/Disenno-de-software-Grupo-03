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
    const eventsPromise = mainController.filterCalendar(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const createEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const eventsPromise = mainController.createEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const getEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const eventsPromise = mainController.getEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const updateEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const eventsPromise = mainController.updateEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const deleteEvent: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const eventsPromise = mainController.deleteEvent(req.body);
    const events = await eventsPromise;
    res.status(200).json(events);
}