import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";

export const addContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("title") || !body.hasOwnProperty("description") || !body.hasOwnProperty("date") || !body.hasOwnProperty("imageId") || !body.hasOwnProperty("categoryName") || !body.hasOwnProperty("tags")){
        res.status(400).json({msg: "1-Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.title != "string" || typeof body.description != "string" || typeof body.date != "string" || typeof body.imageId != "string" || typeof body.categoryName != "string"){
        res.status(400).json({msg: "2-Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the tags
    if(!Array.isArray(body.tags)){
        res.status(400).json({msg: "3-Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.title.length == 0 || body.date.length == 0 || body.imageId.length == 0 || body.categoryName.length == 0){
        res.status(400).json({msg: "4-Bad Request: Body is not correct"});
        return;
    }

    const contentPromise = mainController.addContent(body);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const deleteContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();
    
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("_id")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body._id != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body._id.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const contentPromise = mainController.deleteContent(body._id);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const updateContent : RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("title") || !body.hasOwnProperty("description") || !body.hasOwnProperty("date") || !body.hasOwnProperty("imageId") || !body.hasOwnProperty("categoryName") || !body.hasOwnProperty("tags") || !body.hasOwnProperty("_id")){
        res.status(400).json({msg: "1-Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.title != "string" || typeof body.description != "string" || typeof body.date != "string" || typeof body.imageId != "string" || typeof body.categoryName != "string" || typeof body._id != "string"){
        res.status(400).json({msg: "2-Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the tags
    if(!Array.isArray(body.tags)){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.title.length == 0 || body.date.length == 0 || body.imageId.length == 0 || body.categoryName.length == 0 || body._id.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }


    const contentPromise = mainController.updateContent(body);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const getContentById : RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("_id")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body._id != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body._id.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const contentPromise = mainController.getContent(body._id);
    const content = await contentPromise; // Espera a que la promesa se resuelva

    console.log("This is content: "+ content);
    res.status(200).json(content);
}

export const getFilteredContent : RequestHandler = async (req, res) => {
    //res.status(200).json({ message: 'Hello World' })
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryNames") || !body.hasOwnProperty("tags")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(!Array.isArray(body.categoryNames) || !Array.isArray(body.tags)){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
     
    const contentPromise = mainController.getFilteredContent(body.categoryNames, body.tags);
    const content = await contentPromise; // Espera a que la promesa se resuelva
    res.status(200).json(content);
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

