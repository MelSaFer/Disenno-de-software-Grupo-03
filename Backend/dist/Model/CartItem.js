"use strict";
/*
Class CartItem

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
class CartItem {
    //-------------------------------
    constructor(id, cuantity, product) {
        this.id = 0;
        this.cuantity = 0;
        this.id = id;
        this.cuantity = cuantity;
        this.product = product;
    }
    //-------------------------------
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    //-------------------------------
    getCuantity() {
        return this.cuantity;
    }
    setCuantity(cuantity) {
        this.cuantity = cuantity;
    }
    //-------------------------------
    getProduct() {
        return this.product;
    }
    setProduct(product) {
        this.product = product;
    }
}
exports.CartItem = CartItem;
