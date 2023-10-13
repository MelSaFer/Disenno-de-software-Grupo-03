"use strict";
/*
Class Cart

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    //-------------------------------
    constructor(id, items) {
        this.id = 0;
        this.items = [];
        this.id = id;
        this.items = items;
    }
    //-------------------------------
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    //-------------------------------
    getItems() {
        return this.items;
    }
    setItems(items) {
        this.items = items;
    }
}
exports.Cart = Cart;
