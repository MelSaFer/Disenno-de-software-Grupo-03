import { Response, Request, NextFunction } from "express";

export const register = async ( 
    req: Request<unknown>,
    res: Response,
    next: NextFunction
    ) => {
    res.status(200).json({ message: 'Hello World' })
}

export const forgotPassword= async ( 
    req: Request<unknown>,
    res: Response,
    next: NextFunction
    ) => {
    res.status(200).json({ message: 'Hello World' })
}