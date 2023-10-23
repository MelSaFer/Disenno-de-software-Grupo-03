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


export const getSubCategories: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.getSubCategories(object.categoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

export const getSubcategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.getSubcategory(object.categoryId, object.subcategoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

export const addSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.addSubCategory(object.categoryId, object.subcategory);
    const category = await categoryPromise;
    res.status(200).json(category)
}

export const deleteSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.deleteSubCategory(object.categoryId, object.subcategoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

export const updateSubCategory: RequestHandler = (req, res) => { 
    res.status(200).json({ message: 'Hello World' })
}

