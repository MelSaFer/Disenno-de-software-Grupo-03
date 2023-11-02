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
exports.getProductByName = exports.addProduct = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getCatalogue = void 0;
const MainController_1 = require("../../Controler/Administradores/MainController");
const getCatalogue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    //const body = req.body;
    const galeryPromise = mainController.getCatalogue();
    const galery = yield galeryPromise;
    res.status(200).json(galery);
});
exports.getCatalogue = getCatalogue;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("productId")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.productId != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.productId == "") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const productPromise = mainController.getProduct(body.productId);
    const product = yield productPromise;
    res.status(200).json(product);
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "1-Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("productId") || !body.hasOwnProperty("description") || !body.hasOwnProperty("price") || !body.hasOwnProperty("cuantityAvailable") || !body.hasOwnProperty("imageId")) {
        res.status(400).json({ msg: "2-Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.productId != "string" || typeof body.description != "string" || typeof body.price != "number" || typeof body.cuantityAvailable != "number" || typeof body.imageId != "string") {
        res.status(400).json({ msg: "3-Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.productId == "" || body.price < 0 || body.cuantityAvailable < 0 || body.imageId == "") {
        res.status(400).json({ msg: "4-Bad Request: Body is not correct" });
        return;
    }
    const productPromise = mainController.updateProduct(body);
    const product = yield productPromise;
    res.status(200).json(product);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("productId")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.productId != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.productId == "") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const productPromise = mainController.deleteProduct(body.productId);
    const product = yield productPromise;
    res.status(200).json(product);
});
exports.deleteProduct = deleteProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "1-Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("description") || !body.hasOwnProperty("price") || !body.hasOwnProperty("cuantityAvailable") || !body.hasOwnProperty("imageId")) {
        res.status(400).json({ msg: "2-Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.description != "string" || typeof body.price != "number" || typeof body.cuantityAvailable != "number" || typeof body.imageId != "string") {
        res.status(400).json({ msg: "3-Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.price < 0 || body.cuantityAvailable < 0 || body.imageId == "") {
        res.status(400).json({ msg: "4-Bad Request: Body is not correct" });
        return;
    }
    const productPromise = mainController.addProduct(body);
    const product = yield productPromise;
    res.status(200).json(product);
});
exports.addProduct = addProduct;
const getProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("name")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.name != "string") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.name == "") {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    const productPromise = mainController.getProductByName(body.name);
    const product = yield productPromise;
    res.status(200).json(product);
});
exports.getProductByName = getProductByName;
