"use strict";
/*
Class Product

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    //-------------------------------
    constructor(code, description, cuantityAvailable, image, price) {
        this.code = "";
        this.description = "";
        this.cuantityAvailable = 0;
        this.price = 0;
        this.code = code;
        this.description = description;
        this.cuantityAvailable = cuantityAvailable;
        this.image = image;
        this.price = price;
    }
    //-------------------------------
    getCode() {
        return this.code;
    }
    setCode(code) {
        this.code = code;
    }
    //-------------------------------
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    //-------------------------------
    getCuantityAvailable() {
        return this.cuantityAvailable;
    }
    setCuantityAvailable(cuantityAvailable) {
        this.cuantityAvailable = cuantityAvailable;
    }
    //-------------------------------
    getImage() {
        return this.image;
    }
    setImage(image) {
        this.image = image;
    }
    //-------------------------------
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
}
exports.Product = Product;
