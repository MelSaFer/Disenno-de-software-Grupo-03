import { RequestHandler } from "express";
//import { DAOCart } from "../../Controler/DAO/DAOCart";

// export const loadCart: RequestHandler = async (req, res) => {
//     const dao = new DAOCart();
//     const carritoPromise = dao.getObject(3);
//     const carrito = await carritoPromise; // Espera a que la promesa se resuelva

//     console.log("This is carrito: "+ carrito);
//     res.json(carrito);
// }

// export const addProductToCart: RequestHandler = (req, res) => {
//     const dao = new DAOCart();
//     const carrito = dao.create(req.body);
//     res.json(carrito);
// }

// export const deleteProductFromCart: RequestHandler = (req, res) => {
//     const dao = new DAOCart();
//     const carrito = dao.delete(req.body.id);
//     res.json(carrito);
// }

// export const updateProductFromCart: RequestHandler = (req, res) => {
//     const dao = new DAOCart();
//     const carrito = dao.update(req.body);
//     res.json(carrito);
// }
