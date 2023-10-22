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
    const object = req.body;
    const userPromise = mainController.updateCart(object.userId, object.productId, object.quantity);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}

/*
METHOD POST PURCHASE
*/
export const getCart: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const userPromise = mainController.getCart(object.userId);
    const cart = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is cart: "+ cart);
    res.status(200).json(cart);
}

/*
METHOD GET PURCHASE HISTORY
*/
export const getPurchaseHistory: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const purchaseHistoryPromise = mainController.getPurchaseHistory(object.userId);
    const purchaseHistory = await purchaseHistoryPromise; // Espera a que la promesa se resuelva

    console.log("This is purchase history: "+ purchaseHistory);
    res.status(200).json(purchaseHistory);
}

/*
METHOD PUT PURCHASE STATE
*/
export const updatePurchaseState: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const userPromise = mainController.updatePurchaseState(object.userId, object.purchaseId, object.state);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}


