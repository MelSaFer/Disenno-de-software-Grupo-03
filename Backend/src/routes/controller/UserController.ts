import { RequestHandler } from "express";

export const getInfo: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}


