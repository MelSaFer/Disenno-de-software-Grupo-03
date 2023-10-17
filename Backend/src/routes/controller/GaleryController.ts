import { RequestHandler } from "express";

export const addContent : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const deleteContent : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const updateContent : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getContentById : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getFilteredContent : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getFilteredSubcontent : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getAllContent : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

export const getContentQuantity : RequestHandler = (req, res) => {
    res.status(200).json({ message: 'Hello World' })
}

