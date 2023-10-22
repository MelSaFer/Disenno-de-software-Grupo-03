import e, { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";

export const getCatalogue: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    //const object = req.body;
    const galeryPromise = mainController.getCatalogue();
    const galery = await galeryPromise; 
    res.status(200).json(galery)
}

export const getProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const productPromise = mainController.getProduct(object.productId);
    const product = await productPromise; 
    res.status(200).json(product)
}

export const updateProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const productPromise = mainController.updateProduct(object);
    const product = await productPromise; 
    res.status(200).json(product)
}


export const deleteProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const productPromise = mainController.deleteProduct(object.productId);
    const product = await productPromise; 
    res.status(200).json(product)
}

export const addProduct: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const productPromise = mainController.addProduct(object);
    const product = await productPromise; 
    res.status(200).json(product)
}



