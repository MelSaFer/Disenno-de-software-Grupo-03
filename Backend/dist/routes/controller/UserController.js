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
exports.addNotification = exports.getAllUsers = exports.isUnread = exports.updateNotificationState = exports.getNotifications = exports.addUser = exports.makePurchase = exports.updatePurchaseState = exports.getPurchaseHistory = exports.getCart = exports.updateCart = exports.getInfoUser = void 0;
const MainController_1 = require("../../Controler/Administradores/MainController");
const config_1 = require("../../Controler/config");
/*
METHOD GET INFO USER
*/
const getInfoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const userId = 2;
    // const url =`${API_URL}/infoUser`
    // const response = await axios.get(url);
    // const data = await response.data;
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string") {
        res.status(400).json({ msg: "Bad Request: userId is not a number" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId is not a valid id" });
        return;
    }
    const mainController = new MainController_1.MainController();
    const userPromise = mainController.getInfoUser(body.userId);
    const user = yield userPromise; // Espera a que la promesa se resuelva
    console.log("This is user: " + user);
    res.status(200).json(user);
});
exports.getInfoUser = getInfoUser;
/*
METHOD POST CART
*/
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId") || !body.hasOwnProperty("productId") || !body.hasOwnProperty("quantity")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string" || typeof body.productId != "string" || typeof body.quantity != "number") {
        res.status(400).json({ msg: "Bad Request: userId, productId or quantity are not a number/string" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0 || body.productId.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId, productId or quantity are not a valid input" });
        return;
    }
    const userPromise = mainController.updateCart(body.userId, body.productId, body.quantity);
    const user = yield userPromise; // Espera a que la promesa se resuelva
    console.log("This is user: " + user);
    res.status(200).json(user);
});
exports.updateCart = updateCart;
/*
METHOD POST PURCHASE
*/
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string") {
        res.status(400).json({ msg: "Bad Request: userId is not a number" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId is not a valid id" });
        return;
    }
    const userPromise = mainController.getCart(body.userId);
    const cart = yield userPromise; // Espera a que la promesa se resuelva
    console.log("This is cart: " + cart);
    res.status(200).json(cart);
});
exports.getCart = getCart;
/*
METHOD GET PURCHASE HISTORY
*/
const getPurchaseHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string") {
        res.status(400).json({ msg: "Bad Request: userId is not a number" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId is not a valid id" });
        return;
    }
    const purchaseHistoryPromise = mainController.getPurchaseHistory(body.userId);
    const purchaseHistory = yield purchaseHistoryPromise; // Espera a que la promesa se resuelva
    console.log("This is purchase history: " + purchaseHistory);
    res.status(200).json(purchaseHistory);
});
exports.getPurchaseHistory = getPurchaseHistory;
/*
METHOD PUT PURCHASE STATE
*/
const updatePurchaseState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId") || !body.hasOwnProperty("purchaseId") || !body.hasOwnProperty("state") || !body.hasOwnProperty("location")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string" || typeof body.purchaseId != "string" || typeof body.state != "string" || typeof body.location != "string") {
        res.status(400).json({ msg: "Bad Request: userId, purchaseId or state are not a string" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0 || body.purchaseId.length == 0 || body.location.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId or purchaseId are not a valid string" });
        return;
    }
    //Verify state is valid
    if (body.state != config_1.PENDING_STATE && body.state != config_1.ACCEPTED_STATE && body.state != config_1.DECLINED_STATE) {
        console.log("El estado ingresado no es válido");
        res.status(400).json({ msg: "Bad Request: El estado ingresado no es válido" });
        return false;
    }
    const userPromise = mainController.updatePurchaseState(body.userId, body.purchaseId, body.state, body.location);
    const user = yield userPromise; // Espera a que la promesa se resuelva
    //console.log("This is user: "+ user);
    res.status(200).json(user);
});
exports.updatePurchaseState = updatePurchaseState;
/*
METHOD POST PURCHASE
*/
const makePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("purchaseDetails") || !body.hasOwnProperty("products") || !body.hasOwnProperty("voucherId") || !body.hasOwnProperty("aproxDeliveryDate") /*|| !body.hasOwnProperty("shippingAddress")*/ || !body.hasOwnProperty("shippingPrice") || !body.hasOwnProperty("userId") || !body.hasOwnProperty("state")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.purchaseDetails != "string" || typeof body.voucherId != "string" || typeof body.aproxDeliveryDate != "string" || typeof body.shippingAddress != "string" /*|| typeof body.shippingPrice != "number" */ || typeof body.userId != "string" || typeof body.state != "string") {
        res.status(400).json({ msg: "Bad Request: purchaseId, purchaseDetails, voucherId, aproxDeliveryDate, shippingAdress, shippingPrice, userId or state are not a number" });
        return;
    }
    //Verify products type of the content
    if (!Array.isArray(body.products)) {
        res.status(400).json({ msg: "Bad Request: products is not an array" });
        return;
    }
    //Verify if the body has the correct structure
    if ( /*body.shippingPrice <= 0 ||*/body.userId.length == 0 || body.voucherId.length == 0) {
        res.status(400).json({ msg: "Bad Request: voucherId, purchaseId, shippingPrice or userId are not a valid string/number" });
        return;
    }
    //Verify state is valid
    if (body.state != config_1.PENDING_STATE && body.state != config_1.ACCEPTED_STATE && body.state != config_1.DECLINED_STATE) {
        console.log("El estado ingresado no es válido");
        return false;
    }
    const userPromise = mainController.makePurchase(body);
    const user = yield userPromise; // Espera a que la promesa se resuelva
    console.log("This is user: " + user);
    res.status(200).json(user);
});
exports.makePurchase = makePurchase;
/*
METHOD POST ADD USER
*/
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId") || !body.hasOwnProperty("email") || !body.hasOwnProperty("roleType") || !body.hasOwnProperty("cart")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string" || typeof body.email != "string" || typeof body.roleType != "string") {
        res.status(400).json({ msg: "Bad Request: userId, email or roleType are not a string" });
        return;
    }
    //Verify cart type of the content
    if (!Array.isArray(body.cart)) {
        res.status(400).json({ msg: "Bad Request: cart is not an array" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0 || body.email == "" || body.roleType == "") {
        res.status(400).json({ msg: "Bad Request: userId, email or roleType are not a valid string" });
        return;
    }
    const userPromise = mainController.addUser(body);
    const user = yield userPromise; // Espera a que la promesa se resuelva
    console.log("This is user: " + user);
    res.status(200).json(user);
});
exports.addUser = addUser;
/*
METHOD GET NOTIFICATIONS
*/
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ msg: "Bad Request: Body is empty" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId")) {
        res.status(400).json({ msg: "Bad Request: Body is not correct" });
        return;
    }
    //Verify type of the content
    if (typeof body.userId != "string") {
        res.status(400).json({ msg: "Bad Request: userId is not a number" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId is not a valid id" });
        return;
    }
    const purchaseHistoryPromise = mainController.getNotifications(body.userId);
    const purchaseHistory = yield purchaseHistoryPromise; // Espera a que la promesa se resuelva
    console.log("This is notifications: " + purchaseHistory);
    res.status(200).json(purchaseHistory);
});
exports.getNotifications = getNotifications;
const updateNotificationState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ "name": "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId")) {
        res.status(400).json({ "name": "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body.userId !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0) {
        res.status(400).json({ msg: "Bad Request: notificationId or userId are not a valid id" });
        return;
    }
    const eventsPromise = mainController.updateNotificationState(body.userId);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.updateNotificationState = updateNotificationState;
const isUnread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Verify if the body is empty
    if (Object.keys(body).length == 0) {
        res.status(400).json({ "name": "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (!body.hasOwnProperty("userId")) {
        res.status(400).json({ "name": "Error en el body" });
        return;
    }
    //Verify if the body has the correct data types
    if (typeof body.userId !== "string") {
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if (body.userId.length == 0) {
        res.status(400).json({ msg: "Bad Request: userId are not a valid id" });
        return;
    }
    const eventsPromise = mainController.isUnread(body.userId);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.isUnread = isUnread;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const users = yield mainController.getAllUsers();
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
const addNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mainController = new MainController_1.MainController();
    const body = req.body;
    //Validate notification JSON structure
    if (body.length == 0) {
        //console.log("No se encontraron notificaciones");
        return { "name": "No se encontraron notificaciones" };
    }
    if (!body.hasOwnProperty("purchaseId") || !body.hasOwnProperty("deliveryDate") || !body.hasOwnProperty("notificationTime") || !body.hasOwnProperty("state") || !body.hasOwnProperty("notificationType") || !body.hasOwnProperty("userId")) {
        //console.log("La notificación no tiene la estructura correcta");
        return { "name": "1. La notificación no tiene la estructura correcta" };
    }
    if (typeof body.purchaseId != "string" || typeof body.deliveryDate != "string" || typeof body.notificationTime != "string" || typeof body.state != "boolean" || typeof body.notificationType != "string" || typeof body.userId != "string") {
        //console.log("La notificación no tiene la estructura correcta");
        return { "name": "La notificación no tiene la estructura correcta" };
    }
    const eventsPromise = mainController.addNotification(body);
    const events = yield eventsPromise;
    res.status(200).json(events);
});
exports.addNotification = addNotification;
