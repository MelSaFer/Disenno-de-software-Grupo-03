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
    if(typeof body.userId != "number"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId <= 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid number"});
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
    if(typeof body.userId != "number" || typeof body.productId != "number" || typeof body.quantity != "number"){
        res.status(400).json({msg: "Bad Request: userId, productId or quantity are not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId <= 0 || body.productId <= 0 || body.quantity <= 0){
        res.status(400).json({msg: "Bad Request: userId, productId or quantity are not a valid number"});
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
    if(typeof body.userId != "number"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId <= 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid number"});
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
    if(typeof body.userId != "number"){
        res.status(400).json({msg: "Bad Request: userId is not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId <= 0){
        res.status(400).json({msg: "Bad Request: userId is not a valid number"});
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
    if(typeof body.userId != "number" || typeof body.purchaseId != "number" || typeof body.state != "string"){
        res.status(400).json({msg: "Bad Request: userId, purchaseId or state are not a number"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.userId <= 0 || body.purchaseId <= 0){
        res.status(400).json({msg: "Bad Request: userId or purchaseId are not a valid number"});
        return;
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
    if(!body.hasOwnProperty("purchaseId") || !body.hasOwnProperty("purchaseDetails") || !body.hasOwnProperty("products") || !body.hasOwnProperty("voucherId") || !body.hasOwnProperty("aproxDeliveryDate") || !body.hasOwnProperty("shippingAddress") || !body.hasOwnProperty("shippingPrice") || !body.hasOwnProperty("userId") || !body.hasOwnProperty("state")){
        res.status(400).json({msg: "Bad Request: Body is not correct"});
        return;
    }
    //Verify type of the content
    if(typeof body.purchaseId != "number" || typeof body.purchaseDetails != "string" || typeof body.voucherId != "string" || typeof body.aproxDeliveryDate != "string" || typeof body.shippingAddress != "string" || typeof body.shippingPrice != "number" || typeof body.userId != "number" || typeof body.state != "string"){
        res.status(400).json({msg: "Bad Request: purchaseId, purchaseDetails, voucherId, aproxDeliveryDate, shippingAdress, shippingPrice, userId or state are not a number"});
        return;
    }
    //Verify products type of the content
    if(!Array.isArray(body.products)){
        res.status(400).json({msg: "Bad Request: products is not an array"});
        return;
    }
    //Verify if the body has the correct structure
    if(body.purchaseId <= 0 || body.shippingPrice <= 0 || body.userId <= 0){
        res.status(400).json({msg: "Bad Request: purchaseId, shippingPrice or userId are not a valid number"});
        return;
    }
    //Verify state is valid
    if (body.state != "PENDING" && body.state != "CHECKED" && body.state != "DELIVERED" && body.state != "SEND"){
        console.log("El estado ingresado no es válido");
        return false;
    }

    const userPromise = mainController.makePurchase(body);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}


