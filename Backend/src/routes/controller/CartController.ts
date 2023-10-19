import { RequestHandler } from "express";
import { DAOCart } from "../../Controler/DAO/DAOCart";

export const loadCart: RequestHandler = (req, res) => {
    const dao = new DAOCart();
    const carrito = dao.getObject(req.body.id);
    res.json(carrito);
}

export const addProductToCart: RequestHandler = (req, res) => {
    const dao = new DAOCart();
    const carrito = dao.create(req.body);
    res.json(carrito);
}

export const deleteProductFromCart: RequestHandler = (req, res) => {
    const dao = new DAOCart();
    const carrito = dao.delete(req.body.id);
    res.json(carrito);
}

export const updateProductFromCart: RequestHandler = (req, res) => {
    const dao = new DAOCart();
    const carrito = dao.update(req.body);
    res.json(carrito);
}
