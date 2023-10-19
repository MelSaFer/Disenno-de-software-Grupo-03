import { RequestHandler } from "express";
import { DAOCart } from "../../Controler/DAO/DAOCart";

export const loadCart: RequestHandler = (req, res) => {
    const dao = new DAOCart();
    const carrito = dao.getObject(req.body.id);
    res.json(carrito);
}

export const addProductToCart: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const deleteProductFromCart: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const updateProductFromCart: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}
