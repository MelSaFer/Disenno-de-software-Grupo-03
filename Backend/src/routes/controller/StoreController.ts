import e, { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";

export const getCatalogue: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    //const body = req.body;
    const galeryPromise = mainController.getCatalogue();
    const galery = await galeryPromise; 
    res.status(200).json(galery)
}

export const getProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("productId")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.productId != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.productId == ""){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const productPromise = mainController.getProduct(body.productId);
    const product = await productPromise; 
    res.status(200).json(product)
}

export const updateProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "1-Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("productId") || !body.hasOwnProperty("description") || !body.hasOwnProperty("price") || !body.hasOwnProperty("cuantityAvailable") || !body.hasOwnProperty("imageId")){
        res.status(400).json({msg: "2-Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.productId != "string" || typeof body.description != "string" || typeof body.price != "number" || typeof body.cuantityAvailable != "number" || typeof body.imageId != "string"){
        res.status(400).json({msg: "3-Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.productId == "" || body.price < 0 || body.cuantityAvailable < 0 || body.imageId == ""){
        res.status(400).json({msg: "4-Bad Request: Body is not correct"});
        return;
    }

    const productPromise = mainController.updateProduct(body);
    const product = await productPromise; 
    res.status(200).json(product)
}


export const deleteProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("productId")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.productId != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.productId == ""){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const productPromise = mainController.deleteProduct(body.productId);
    const product = await productPromise; 
    res.status(200).json(product)
}

export const addProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "1-Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("description") || !body.hasOwnProperty("price") || !body.hasOwnProperty("cuantityAvailable") || !body.hasOwnProperty("imageId")){
        res.status(400).json({msg: "2-Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if( typeof body.description != "string" || typeof body.price != "number" || typeof body.cuantityAvailable != "number" || typeof body.imageId != "string"){
        res.status(400).json({msg: "3-Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if( body.price < 0 || body.cuantityAvailable < 0 || body.imageId == ""){
        res.status(400).json({msg: "4-Bad Request: Body is not correct"});
        return;
    }

    const productPromise = mainController.addProduct(body);
    const product = await productPromise; 
    res.status(200).json(product)
}



