"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const getInfo = (req, res) => {
    res.status(200).json({ message: 'Hello World' });
};
exports.getInfo = getInfo;
