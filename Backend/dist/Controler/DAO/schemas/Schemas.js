"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = exports.CalendarSchema = exports.SubcategorySchema = exports.CategorySchema = exports.ContentSchema = exports.PurchaseSchema = exports.ProductSchema = exports.CartItemSchema = exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//USER SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.UserSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    roleType: { type: String, required: true },
    cart: { type: Array, required: true }
});
//CART SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.CartItemSchema = new mongoose_1.default.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true }
});
//PRODUCT SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.ProductSchema = new mongoose_1.default.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    cuantityAvailable: { type: Number, required: true },
    imageId: { type: String, required: true },
    price: { type: Number, required: true }
});
//PURCHASE HISTORY SCHEMA-------------------------------------------------------------------------------------------------------------------
exports.PurchaseSchema = new mongoose_1.default.Schema({
    //purchaseId: { type: Number, required: true },
    purchaseDetails: { type: String, required: true },
    products: { type: Array, require: true },
    voucherId: { type: String, require: true },
    aproxDeliveryDate: { type: String, require: true },
    shippingAddress: { type: String, require: true },
    shippingPrice: { type: Number, required: true },
    userId: { type: String, required: true },
    state: { type: String, required: true }
});
//CONTENT SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.ContentSchema = new mongoose_1.default.Schema({
    contentId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    imageId: { type: String, required: true },
    categoryName: { type: String, required: true },
    tags: { type: Array, required: true }
});
//CATEGORY SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.CategorySchema = new mongoose_1.default.Schema({
    //categoryId: { type: Number, required: true },
    categoryName: { type: String, required: true },
    subcategories: { type: Array, required: true }
});
//CATEGORY SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.SubcategorySchema = new mongoose_1.default.Schema({
    //subcategoryId: { type: Number, required: true },
    subcategoryName: { type: String, required: true },
});
//CALENDAR SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.CalendarSchema = new mongoose_1.default.Schema({
    events: { type: Array, required: true }
});
//EVENT SCHEMA------------------------------------------------------------------------------------------------------------------------------
exports.EventSchema = new mongoose_1.default.Schema({
    //eventId: { type: String, required: true },
    purchaseId: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: false },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    date: { type: Date, required: true },
    eventType: { type: String, required: true }
});
