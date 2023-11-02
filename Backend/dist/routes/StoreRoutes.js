"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const StoreController = __importStar(require("./controller/StoreController"));
//Add products to the store
router.get("/getCatalogue", StoreController.getCatalogue);
//Update a product from the store
router.put("/updateProduct", StoreController.updateProduct);
//Consult a product from the store
router.post("/getProduct", StoreController.getProduct);
//Delete a product from the store
router.delete("/deleteProduct", StoreController.deleteProduct);
//Create a new product in the store
router.post("/addProduct", StoreController.addProduct);
//Consult a product from the store by the name of the product
router.post("/getProductByName", StoreController.getProductByName);
exports.default = router;
