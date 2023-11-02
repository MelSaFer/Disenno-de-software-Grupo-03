"use strict";
/*
Class Product

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOProduct = void 0;
class DTOProduct {
    //-------------------------------
    constructor(productId, description, cuantityAvailable, imageId, price) {
        this.productId = "";
        this.description = "";
        this.cuantityAvailable = 0;
        this.imageId = "";
        this.price = 0;
        this.productId = productId;
        this.description = description;
        this.cuantityAvailable = cuantityAvailable;
        this.imageId = imageId;
        this.price = price;
    }
}
exports.DTOProduct = DTOProduct;
