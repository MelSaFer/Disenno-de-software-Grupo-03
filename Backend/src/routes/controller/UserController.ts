import { RequestHandler } from "express";
import { AdminUser } from "../../Controler/Administradores/AdminUser";
import { MainController } from "../../Controler/Administradores/MainController";

export const getInfo: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getInfoUser: RequestHandler = async (req, res) => {
    const mainController = new MainController();
    const userPromise = mainController.getInfoUser(1);
    const user = await userPromise; // Espera a que la promesa se resuelva

    console.log("This is carrito: "+ user);
    res.status(200).json(user);
// }

    //const adminUser = new AdminUser();
    //const prueba = adminUser.getInfoUser(1);
    //res.status(200).json({ message: prueba })
}


