import { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";

/*
METHOD GET INFO USER
*/
export const getInfoUser: RequestHandler = async (req, res) => {
    //const userId = 2;
    // const url =`${API_URL}/infoUser`
    // const response = await axios.get(url);
    // const data = await response.data;
    

    const body = req.body;
    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid id"});
        return;
    }
    

    const mainController = new MainController();
    const userPromise = mainController.getInfoUser(body.userId);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);

}

/*
METHOD POST CART
*/
export const updateCart: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId") || !body.hasOwnProperty("productId") || !body.hasOwnProperty("quantity")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string" || typeof body.productId != "string" || typeof body.quantity != "number"){
        res.status(400).json({msg: "Bad Request: userId, productId or quantity are not a number/string"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0 || body.productId.length == 0){
        res.status(400).json({msg: "Bad Request: userId, productId or quantity are not a valid input"});
        return;
    }

    const userPromise = mainController.updateCart(body.userId, body.productId, body.quantity);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}

/*
METHOD POST PURCHASE
*/
export const getCart: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid id"});
        return;
    }

    const userPromise = mainController.getCart(body.userId);
    const cart = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is cart: "+ cart);
    res.status(200).json(cart);
}

/*
METHOD GET PURCHASE HISTORY
*/
export const getPurchaseHistory: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid id"});
        return;
    }

    const purchaseHistoryPromise = mainController.getPurchaseHistory(body.userId);
    const purchaseHistory = await purchaseHistoryPromise; // Espera a que la promesa se resuelva

    console.log("This is purchase history: "+ purchaseHistory);
    res.status(200).json(purchaseHistory);
}

/*
METHOD PUT PURCHASE STATE
*/
export const updatePurchaseState: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId") || !body.hasOwnProperty("purchaseId") || !body.hasOwnProperty("state")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string" || typeof body.purchaseId != "string" || typeof body.state != "string"){
        res.status(400).json({msg: "Bad Request: userId, purchaseId or state are not a string"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0 || body.purchaseId.length == 0){
        res.status(400).json({msg: "Bad Request: userId or purchaseId are not a valid string"});
        return;
    }
    //Verify state is valid
    if (body.state != "PENDING" && body.state != "ACCEPTED" && body.state != "REJECTED"){
        console.log("El estado ingresado no es válido");
        res.status(400).json({msg: "Bad Request: userId or purchaseId are not a valid string"});
        return false;
    }

    const userPromise = mainController.updatePurchaseState(body.userId, body.purchaseId, body.state);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}

/*
METHOD POST PURCHASE
*/
export const makePurchase: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("purchaseDetails") || !body.hasOwnProperty("products") || !body.hasOwnProperty("voucherId") || !body.hasOwnProperty("aproxDeliveryDate") || !body.hasOwnProperty("shippingAddress") || !body.hasOwnProperty("shippingPrice") || !body.hasOwnProperty("userId") || !body.hasOwnProperty("state")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.purchaseDetails != "string" || typeof body.voucherId != "string" || typeof body.aproxDeliveryDate != "string" || typeof body.shippingAddress != "string" || typeof body.shippingPrice != "number" || typeof body.userId != "string" || typeof body.state != "string"){
        res.status(400).json({msg: "Bad Request: purchaseId, purchaseDetails, voucherId, aproxDeliveryDate, shippingAdress, shippingPrice, userId or state are not a number"});
        return;
    }
    //Verify products type of the content
    if(!Array.isArray(body.products)){
        res.status(400).json({msg: "Bad Request: products is not an array"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.shippingPrice <= 0 || body.userId.length == 0 || body.voucherId.length == 0){
        res.status(400).json({msg: "Bad Request: voucherId, purchaseId, shippingPrice or userId are not a valid string/number"});
        return;
    }
    //Verify state is valid
    if (body.state != "PENDING" && body.state != "APPROVED" && body.state != "DELIVERED" && body.state != "SEND" && body.state != "REJECTED"){
        console.log("El estado ingresado no es válido");
        return false;
    }

    const userPromise = mainController.makePurchase(body);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}

/*
METHOD POST ADD USER
*/
export const addUser: RequestHandler = async (req, res) => {
    const mainController = new MainController();

    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId") || !body.hasOwnProperty("email") || !body.hasOwnProperty("roleType") || !body.hasOwnProperty("cart")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string" || typeof body.email != "string" || typeof body.roleType != "string"){
        res.status(400).json({msg: "Bad Request: userId, email or roleType are not a string"});
        return;
    }
    //Verify cart type of the content
    if(!Array.isArray(body.cart)){
        res.status(400).json({msg: "Bad Request: cart is not an array"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0 || body.email == "" || body.roleType == ""){
        res.status(400).json({msg: "Bad Request: userId, email or roleType are not a valid string"});
        return;
    }

    const userPromise = mainController.addUser(body);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}

/*
METHOD GET NOTIFICATIONS
*/

export const getNotifications: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({msg: "Bad Request: Body is empty"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.userId != "string"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid id"});
        return;
    }

    const purchaseHistoryPromise = mainController.getNotifications(body.userId);
    const purchaseHistory = await purchaseHistoryPromise; // Espera a que la promesa se resuelva

    console.log("This is notifications: "+ purchaseHistory);
    res.status(200).json(purchaseHistory);
}

export const updateNotificationState: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId")){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if(typeof body.userId !== "string"){
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: notificationId or userId are not a valid id"});
        return;
    }

    const eventsPromise = mainController.updateNotificationState(body.userId);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const isUnread: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    //Verify if the body is empty
    if(Object.keys(body).length == 0){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct structure
    if(!body.hasOwnProperty("userId")){
        res.status(400).json({"name": "Error en el body"});
        return;
    }
    //Verify if the body has the correct data types
    if(typeof body.userId !== "string"){
        res.status(400).json({ name: "Error en el body" });
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId.length == 0){
        res.status(400).json({msg: "Bad Request: userId are not a valid id"});
        return;
    }

    const eventsPromise = mainController.isUnread(body.userId);
    const events = await eventsPromise;
    res.status(200).json(events);
}

export const getAllUsers: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const users = await mainController.getAllUsers();
    res.status(200).json(users);
}

export const addNotification: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const body = req.body;

    const eventsPromise = mainController.addNotification(body);
    const events = await eventsPromise;
    res.status(200).json(events);
}


