"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlencodedParser = exports.jsonParser = void 0;
//Aquí va la configuración de express
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const functions = require("firebase-functions");
//import loginRoutes from "./routes/loginRoutes"
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const GaleryRoutes_1 = __importDefault(require("./routes/GaleryRoutes"));
const CategoryRoutes_1 = __importDefault(require("./routes/CategoryRoutes"));
//import cartRoutes from "./routes/CartRoutes"
const StoreRoutes_1 = __importDefault(require("./routes/StoreRoutes"));
const app = express();
const bp = require("body-parser");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(loginRoutes)
app.use(userRoutes_1.default);
app.use(GaleryRoutes_1.default);
app.use(CategoryRoutes_1.default);
//app.use(cartRoutes)
app.use(StoreRoutes_1.default);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
exports.jsonParser = bp.json();
exports.urlencodedParser = bp.urlencoded({ extended: false });
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
exports.api = functions.https.onRequest(app);
exports.default = app;
