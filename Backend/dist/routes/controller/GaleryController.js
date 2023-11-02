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
exports.getContentQuantity = exports.getAllContent = exports.getFilteredSubcontent = exports.getFilteredContent = exports.getContentById = exports.updateContent = exports.deleteContent = exports.addContent = void 0;
const MainController_1 = require("../../Controler/Administradores/MainController");
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("title") || !body.hasOwnProperty("description") || !body.hasOwnProperty("date") || !body.hasOwnProperty("imageId") || !body.hasOwnProperty("categoryName") || !body.hasOwnProperty("tags")) {
        res.status(400).json({ msg: "1-Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.title != "string" || typeof body.description != "string" || typeof body.date != "string" || typeof body.imageId != "string" || typeof body.categoryName != "string") {
        res.status(400).json({ msg: "2-Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the tags
    if (!Array.isArray(body.tags)) {
        res.status(400).json({ msg: "3-Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.title.length == 0 || body.date.length == 0 || body.imageId.length == 0 || body.categoryName.length == 0) {
        res.status(400).json({ msg: "4-Bad Request: Body is not correct" });
        return;
    }
    const contentPromise = mainController.addContent(body);
    const content = yield contentPromise; // Espera a que la promesa se resuelva
    console.log("This is content: " + content);
    res.status(200).json(content);
});
exports.addContent = addContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("_id")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body._id != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body._id.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const contentPromise = mainController.deleteContent(body._id);
    const content = yield contentPromise; // Espera a que la promesa se resuelva
    console.log("This is content: " + content);
    res.status(200).json(content);
});
exports.deleteContent = deleteContent;
const updateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("title") || !body.hasOwnProperty("description") || !body.hasOwnProperty("date") || !body.hasOwnProperty("imageId") || !body.hasOwnProperty("categoryName") || !body.hasOwnProperty("tags") || !body.hasOwnProperty("_id")) {
        res.status(400).json({ msg: "1-Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.title != "string" || typeof body.description != "string" || typeof body.date != "string" || typeof body.imageId != "string" || typeof body.categoryName != "string" || typeof body._id != "string") {
        res.status(400).json({ msg: "2-Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the tags
    if (!Array.isArray(body.tags)) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.title.length == 0 || body.date.length == 0 || body.imageId.length == 0 || body.categoryName.length == 0 || body._id.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const contentPromise = mainController.updateContent(body);
    const content = yield contentPromise; // Espera a que la promesa se resuelva
    console.log("This is content: " + content);
    res.status(200).json(content);
});
exports.updateContent = updateContent;
const getContentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("_id")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body._id != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body._id.length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const contentPromise = mainController.getContent(body._id);
    const content = yield contentPromise; // Espera a que la promesa se resuelva
    console.log("This is content: " + content);
    res.status(200).json(content);
});
exports.getContentById = getContentById;
const getFilteredContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.status(200).json({ message: 'Hello World' })
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("categoryNames") || !body.hasOwnProperty("tags")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (!Array.isArray(body.categoryNames) || !Array.isArray(body.tags)) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const contentPromise = mainController.getFilteredContent(body.categoryNames, body.tags);
    const content = yield contentPromise; // Espera a que la promesa se resuelva
    res.status(200).json(content);
});
exports.getFilteredContent = getFilteredContent;
const getFilteredSubcontent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'Hello World' });
});
exports.getFilteredSubcontent = getFilteredSubcontent;
const getAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const contentPromise = mainController.getAllContent();
    const content = yield contentPromise; // Espera a que la promesa se resuelva
    console.log("This is content: " + content);
    res.status(200).json(content);
});
exports.getAllContent = getAllContent;
const getContentQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'Hello World' });
});
exports.getContentQuantity = getContentQuantity;
