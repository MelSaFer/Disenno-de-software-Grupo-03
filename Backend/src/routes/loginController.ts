import { RequestHandler } from "express";

export const register: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const forgotPassword: RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}