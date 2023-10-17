import { RequestHandler } from "express";

export const loadCart: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
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
