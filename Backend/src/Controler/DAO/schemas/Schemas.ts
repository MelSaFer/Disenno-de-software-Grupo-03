// Importa el paquete mongodb
import mongoose from "mongoose";

//CART SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const CartSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    items: { type: Array, required: true }
});

//PRODUCT SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const productSchema = new mongoose.Schema({
    code: { type: String, required: true },
    description: { type: String, required: true },
    cuantityAvailable: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
});

//USER SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    email : { type: String, required: true },
    roleType: { type: String, required: true },
    purchaseHistory: { type: Array, required: true },
    cart: { type: Array, required: true }
});

//PURCHASE HISTORY SCHEMA-------------------------------------------------------------------------------------------------------------------
export const PurchaseHistorySchema = new mongoose.Schema({
    orderNumber: { type: Number, required: true },
    purchaseDetails: { type: String, required: true },
    product: { type: String, require: true},
    voucher: { type: String, require: true},
    aproxDeliveryDate: { type: String, require: true},
    shippingAdress: { type: String, require: true},
    shippingPrice: { type: Number, required: true }
});

//CONTENT SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const contentSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description : { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: Array, required: true }
});

//CATEGORY SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const categorySchema = new mongoose.Schema({
    idCategory: { type: Number, required: true },
    name: { type: String, required: true },
    subcategories: { type: Array, required: true }
});

