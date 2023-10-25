import e, { RequestHandler } from "express";
import { MainController } from "../../Controler/Administradores/MainController";


export const uploadImage: RequestHandler = async (req, res) => {
    const body = req.body;
    res.status(200).json("Subir imagen")
}