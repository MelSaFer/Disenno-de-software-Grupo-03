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
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName") ||  !body.hasOwnProperty("subcategories")){
        res.status(400).json({msg: "1.Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string" || !Array.isArray(body.subcategories)){
        res.status(400).json({msg: "2.Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0){
        res.status(400).json({msg: "3.Bad Request: Body is not correct"});
        return;
    }


    const categoryPromise = mainController.addCategory(body);
    const category = await categoryPromise; 
    res.status(200).json(category)
}

/*
UPDATE CATEGORY
ENDPOINT: /updateCategory
*/
export const updateCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName") ||  !body.hasOwnProperty("subcategories")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string" || !Array.isArray(body.subcategories)){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.updateCategory(body);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
GET CATEGORY
ENDPOINT: /getCategory
*/
export const getCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.getCategory(body.categoryName);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
DELETE CATEGORY
ENDPOINT: /deleteCategory
*/
export const deleteCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.deleteCategory(body.categoryName);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
GET SUBCATEGORIES
ENDPOINT: /getSubCategories
*/
export const getSubCategories: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.getSubCategories(body.categoryName);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
GET SUBCATEGORY
ENDPOINT: /getSubCategory
*/
export const getSubcategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategoryName")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string" || typeof body.subcategoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0 || body.subcategoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.getSubcategory(body.categoryName, body.subcategoryName);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
ADD SUBCATEGORY
ENDPOINT: /addSubCategory
*/
export const addSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategory")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string" || typeof body.subcategory.subcategoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0 || body.subcategory.subcategoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.addSubCategory(body.categoryName, body.subcategory);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
DELETE SUBCATEGORY
ENDPOINT: /deleteSubCategory
*/
export const deleteSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategoryName")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string" || typeof body.subcategoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0 || body.subcategoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.deleteSubCategory(body.categoryName, body.subcategoryName);
    const category = await categoryPromise;
    res.status(200).json(category)
}

/*
UPDATE SUBCATEGORY
ENDPOINT: /updateSubCategory
*/
export const updateSubCategory: RequestHandler = async (req, res) => { 
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategory")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.categoryName != "string" || typeof body.subcategory.subcategoryName != "string"){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.categoryName.length == 0 || body.subcategory.subcategoryName.length == 0){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }

    const categoryPromise = mainController.updateSubCategory(body.categoryName, body.subcategory );
    const category = await categoryPromise;
    res.status(200).json(category)
}

