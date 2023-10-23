import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";


// ENPOINTS DE CATEGORIAS

/*
 GET CATEGORIES
 ENDPOINT: /getCategories
 */
export const getCategories: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const categoriesPromise = mainController.getCategories();
    const categories = await categoriesPromise
    res.status(200).json(categories)
}

/*
 ADD CATEGORY
 ENDPOINT: /addCategory
 */
export const addCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.addCategory(object);
    const category = await categoryPromise; 
    res.status(200).json(category)
}

/*
UPDATE CATEGORY
ENDPOINT: /updateCategory
*/
export const updateCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.updateCategory(object);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
GET CATEGORY
ENDPOINT: /getCategory
*/
export const getCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.getCategory(object.categoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
DELETE CATEGORY
ENDPOINT: /deleteCategory
*/
export const deleteCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.deleteCategory(object.categoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
GET SUBCATEGORIES
ENDPOINT: /getSubCategories
*/
export const getSubCategories: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.getSubCategories(object.categoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
GET SUBCATEGORY
ENDPOINT: /getSubCategory
*/
export const getSubcategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.getSubcategory(object.categoryId, object.subcategoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
ADD SUBCATEGORY
ENDPOINT: /addSubCategory
*/
export const addSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.addSubCategory(object.categoryId, object.subcategory);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
DELETE SUBCATEGORY
ENDPOINT: /deleteSubCategory
*/
export const deleteSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.deleteSubCategory(object.categoryId, object.subcategoryId);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
UPDATE SUBCATEGORY
ENDPOINT: /updateSubCategory
*/
export const updateSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const object = req.body;
    const categoryPromise = mainController.updateSubCategory(object.categoryId, object.subcategory );
    const category = await categoryPromise;
    res.status(200).json(category)
}

