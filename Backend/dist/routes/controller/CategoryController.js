"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubCategory = exports.deleteSubCategory = exports.addSubCategory = exports.getSubcategory = exports.getSubCategories = exports.deleteCategory = exports.getCategory = exports.updateCategory = exports.addCategory = exports.getCategories = void 0;
const MainController_1 = require("../../Controler/Administradores/MainController");
// ENPOINTS DE CATEGORIAS
/*
 GET CATEGORIES
 ENDPOINT: /getCategories
 */
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const categoriesPromise = mainController.getCategories();
    const categories = yield categoriesPromise;
    res.status(200).json(categories);
});
exports.getCategories = getCategories;
/*
 ADD CATEGORY
 ENDPOINT: /addCategory
 */
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategories")) {
        res.status(400).json({ msg: "1.Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string" || !Array.isArray(body.subcategories)) {
        res.status(400).json({ msg: "2.Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0) {
        res.status(400).json({ msg: "3.Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.addCategory(body);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.addCategory = addCategory;
/*
UPDATE CATEGORY
ENDPOINT: /updateCategory
*/
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategories")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string" || !Array.isArray(body.subcategories)) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.updateCategory(body);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.updateCategory = updateCategory;
/*
GET CATEGORY
ENDPOINT: /getCategory
*/
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.getCategory(body.categoryName);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.getCategory = getCategory;
/*
DELETE CATEGORY
ENDPOINT: /deleteCategory
*/
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.deleteCategory(body.categoryName);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.deleteCategory = deleteCategory;
/*
GET SUBCATEGORIES
ENDPOINT: /getSubCategories
*/
const getSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.getSubCategories(body.categoryName);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.getSubCategories = getSubCategories;
/*
GET SUBCATEGORY
ENDPOINT: /getSubCategory
*/
const getSubcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategoryName")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string" || typeof body.subcategoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0 || body.subcategoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.getSubcategory(body.categoryName, body.subcategoryName);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.getSubcategory = getSubcategory;
/*
ADD SUBCATEGORY
ENDPOINT: /addSubCategory
*/
const addSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategory")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string" || typeof body.subcategory.subcategoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0 || body.subcategory.subcategoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.addSubCategory(body.categoryName, body.subcategory);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.addSubCategory = addSubCategory;
/*
DELETE SUBCATEGORY
ENDPOINT: /deleteSubCategory
*/
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategoryName")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string" || typeof body.subcategoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0 || body.subcategoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.deleteSubCategory(body.categoryName, body.subcategoryName);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.deleteSubCategory = deleteSubCategory;
/*
UPDATE SUBCATEGORY
ENDPOINT: /updateSubCategory
*/
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryName") || !body.hasOwnProperty("subcategory")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.categoryName != "string" || typeof body.subcategory.subcategoryName != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.categoryName.length == 0 || body.subcategory.subcategoryName.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const categoryPromise = mainController.updateSubCategory(body.categoryName, body.subcategory);
    const category = yield categoryPromise;
    res.status(200).json(category);
});
exports.updateSubCategory = updateSubCategory;
