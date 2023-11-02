"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIREBASE_CONFIG = exports.IMAGE_COLLECTION = exports.IMAGETYPE_COLLECTION = exports.PURCHASE_COLLECTION = exports.ROLETYPE_COLLECTION = exports.SHIPPINGADRESS_COLLECTION = exports.SUBCATEGORY_COLLECTION = exports.CONTENT_COLLECTION = exports.CATEGORY_COLLECTION = exports.CARTITEM_COLLECTION = exports.CART_COLLECTION = exports.USER_COLLECTION = exports.PRODUCT_COLLECTION = exports.DATABASE_NAME = exports.MONGODB_URI = exports.API_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//API
exports.API_URL = "http://localhost:3001";
// export const PORT = 3001;
//MONGO DB
exports.MONGODB_URI = "mongodb+srv://fiozelaya:eVNknldK3z3UwYLB@tiendaduende.aorp2bb.mongodb.net/?retryWrites=true&w=majority";
exports.DATABASE_NAME = "TiendaDuende";
exports.PRODUCT_COLLECTION = "Product";
exports.USER_COLLECTION = "User";
exports.CART_COLLECTION = "Cart";
exports.CARTITEM_COLLECTION = "CartItem";
exports.CATEGORY_COLLECTION = "Category";
exports.CONTENT_COLLECTION = "Content";
exports.SUBCATEGORY_COLLECTION = "SubCategory";
exports.SHIPPINGADRESS_COLLECTION = "ShippingAddress";
exports.ROLETYPE_COLLECTION = "RoleType";
//export const PURCHASEHISTORY_COLLECTION = "PurchaseHistory";
exports.PURCHASE_COLLECTION = "Purchase";
exports.IMAGETYPE_COLLECTION = "ImageType";
exports.IMAGE_COLLECTION = "Image";
//export const DB_NAME= "publicaciones"
//Firebase
exports.FIREBASE_CONFIG = {
    apiKey: "AIzaSyAUMTRo2R_g7Z1Vkhx4bjOqnqPQD7UZMDg",
    authDomain: "proyectodisenno-7d92d.firebaseapp.com",
    projectId: "proyectodisenno-7d92d",
    storageBucket: "proyectodisenno-7d92d.appspot.com",
    messagingSenderId: "365378457858",
    appId: "1:365378457858:web:6e46e6e6651e39e789b21b",
    measurementId: "G-MTMEGJ579Z",
};
