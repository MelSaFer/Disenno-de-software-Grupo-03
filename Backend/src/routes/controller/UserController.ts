import { RequestHandler } from "express";
import { AdminUser } from "../../Controler/Administradores/AdminUser";
import { MainController } from "../../Controler/Administradores/MainController";
import { API_URL } from '../../Controler/config';
import axios from "axios";
import { urlencodedParser, jsonParser } from "../../app"
import bodyParser from "body-parser";

export const getInfo: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

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
// }

    //const adminUser = new AdminUser();
    //const prueba = adminUser.getInfoUser(1);
    //res.status(200).json({ message: prueba })
}

export const updateCart: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const object = req.body;
    const userPromise = mainController.updateCart(object.userId, object.productId, object.quantity);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is user: "+ user);
    res.status(200).json(user);
}


