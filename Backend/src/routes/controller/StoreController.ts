import { RequestHandler } from "express";

export const loadCatalogue : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getProductById : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const addProduct : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const updateProduct : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const deleteProduct : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getAvailability : RequestHandler = (req, res) => {  
    res.status(200).json({ message: 'Hello World' })
}