"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ID = exports.DECLINEDDELIVERY_NOTIF = exports.MAKEUP_NOTIF = exports.DELIVERY_NOTIF = exports.PENDING_STATE = exports.DECLINED_STATE = exports.ACCEPTED_STATE = exports.SHIPPING_PRICE = exports.FIREBASE_CONFIG = exports.CALENDAR_COLLECTION = exports.PURCHASE_COLLECTION = exports.CONTENT_COLLECTION = exports.CATEGORY_COLLECTION = exports.CARTITEM_COLLECTION = exports.CART_COLLECTION = exports.USER_COLLECTION = exports.PRODUCT_COLLECTION = exports.DATABASE_NAME = exports.MONGODB_URI = exports.PORT = exports.API_URL = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//API
exports.API_URL = "http://localhost:3001";
exports.PORT = 5000;
//MONGO DB
exports.MONGODB_URI = "mongodb+srv://fiozelaya:eVNknldK3z3UwYLB@tiendaduende.aorp2bb.mongodb.net/?retryWrites=true&w=majority";
exports.DATABASE_NAME = "TiendaDuende";
exports.PRODUCT_COLLECTION = "Product";
exports.USER_COLLECTION = "User";
exports.CART_COLLECTION = "Cart";
exports.CARTITEM_COLLECTION = "CartItem";
exports.CATEGORY_COLLECTION = "Category";
exports.CONTENT_COLLECTION = "Content";
//export const SUBCATEGORY_COLLECTION = "SubCategory";
//export const SHIPPINGADRESS_COLLECTION = "ShippingAddress";
//export const ROLETYPE_COLLECTION = "RoleType";
//export const PURCHASEHISTORY_COLLECTION = "PurchaseHistory";
exports.PURCHASE_COLLECTION = "Purchase";
//export const IMAGETYPE_COLLECTION = "ImageType";
//export const IMAGE_COLLECTION = "Image";
exports.CALENDAR_COLLECTION = "Calendar";
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
exports.SHIPPING_PRICE = 7.99;
exports.ACCEPTED_STATE = "ACCEPTED";
exports.DECLINED_STATE = "DECLINED";
exports.PENDING_STATE = "PENDING";
exports.DELIVERY_NOTIF = "DELIVERY";
exports.MAKEUP_NOTIF = "MAKEUP";
exports.DECLINEDDELIVERY_NOTIF = "DECLINED DELIVERY";
exports.ADMIN_ID = "PFNnWVVK3cOSxci6oGkmxDqrc1n1";
