"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIREBASE_CONFIG = exports.PRODUCT_COLLECTION = exports.DATABASE_NAME = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = 5000;
//MONGO DB
exports.MONGODB_URI = "mongodb+srv://fiozelaya:eVNknldK3z3UwYLB@tiendaduende.aorp2bb.mongodb.net/?retryWrites=true&w=majority";
exports.DATABASE_NAME = "TiendaDuende";
exports.PRODUCT_COLLECTION = "Product";
//export const DB_NAME= "publicaciones"
//Firebase
exports.FIREBASE_CONFIG = {
    apiKey: "AIzaSyAUMTRo2R_g7Z1Vkhx4bjOqnqPQD7UZMDg",
    authDomain: "proyectodisenno-7d92d.firebaseapp.com",
    projectId: "proyectodisenno-7d92d",
    storageBucket: "proyectodisenno-7d92d.appspot.com",
    messagingSenderId: "365378457858",
    appId: "1:365378457858:web:6e46e6e6651e39e789b21b",
    measurementId: "G-MTMEGJ579Z"
};
