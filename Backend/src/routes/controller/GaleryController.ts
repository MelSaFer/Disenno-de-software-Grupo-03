import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";

export const addContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const contentPromise = mainController.addContent(object.contentId, object.title, object.description, object.date, object.imageId, object.categoryId, object.tags);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const deleteContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const contentPromise = mainController.deleteContent(object.contentId);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const updateContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const contentPromise = mainController.updateContent(object.contentId, object.title, object.description, object.date, object.imageId, object.categoryId, object.tags);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const getContentById : RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const contentPromise = mainController.getContent(object.contentId);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const getFilteredContent : RequestHandler = async (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getFilteredSubcontent : RequestHandler = async (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getAllContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const contentPromise = mainController.getAllContent();
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const getContentQuantity : RequestHandler = async (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

