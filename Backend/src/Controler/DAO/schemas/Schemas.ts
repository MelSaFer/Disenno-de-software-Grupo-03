// Importa el paquete mongodb
import mongoose from "mongoose";

//USER SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    roleType: { type: String, required: true },
    cart: { type: Array, required: true }
});


//CART SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const CartItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

//PRODUCT SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const ProductSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    description: { type: String, required: true },
    cuantityAvailable: { type: Number, required: true },
    imageId: { type: String, required: true },
    price: { type: Number, required: true }
});


//PURCHASE HISTORY SCHEMA-------------------------------------------------------------------------------------------------------------------
export const PurchaseSchema = new mongoose.Schema({
    purchaseId: { type: Number, required: true },
    purchaseDetails: { type: String, required: true },
    products: { type: Array, require: true},
    voucherId: { type: String, require: true},
    aproxDeliveryDate: { type: String, require: true},
    shippingAdress: { type: String, require: true},
    shippingPrice: { type: Number, required: true },
    userId: { type: Number, required: true },
    state: { type: String, required: true }
});

//CONTENT SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const ContentSchema = new mongoose.Schema({
    contentId: { type: Number, required: true },
    title: { type: String, required: true },
    description : { type: String, required: true },
    date: { type: Date, required: true },
    imageId: { type: String, required: true },
    categoryId: { type: Number, required: true },
    tags: { type: Array, required: true }
});

//CATEGORY SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const CategorySchema = new mongoose.Schema({
    categoryId: { type: Number, required: true },
    name: { type: String, required: true },
    subcategories: { type: Array, required: true }
});

//CATEGORY SCHEMA------------------------------------------------------------------------------------------------------------------------------
export const SubcategorySchema = new mongoose.Schema({
    subcategoryId: { type: Number, required: true },
    name: { type: String, required: true },
    subcategories: { type: Array, required: true }
});



