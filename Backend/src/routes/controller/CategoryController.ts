import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";

export const getCategories: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const categoriesPromise = mainController.getCategories();
    const categories = await categoriesPromise
    res.status(200).json(categories)
}

export const addCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.addCategory(object);
    const category = await categoryPromise; 
    res.status(200).json(category)
}

export const updateCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.updateCategory(object);
    const category = await categoryPromise;
    res.status(200).json(category)
}

export const getCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.getCategory(object.categoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

export const deleteCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.deleteCategory(object.categoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}


export const getSubCategories: RequestHandler = (req, res) => { 
    res.status(200).json({ message: 'Hello World' })
}

export const addSubCategory: RequestHandler = (req, res) => { 
    res.status(200).json({ message: 'Hello World' })
}

export const deleteSubCategory: RequestHandler = (req, res) => { 
    res.status(200).json({ message: 'Hello World' })
}

export const updateSubCategory: RequestHandler = (req, res) => { 
    res.status(200).json({ message: 'Hello World' })
}

