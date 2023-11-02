"use strict";
/*
Class User

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    //-------------------------------
    constructor(id, name, email, password, roleType, purchaseHistory, cart) {
        this.id = 0;
        this.email = "";
        this.roleType = 0;
        this.id = id;
        this.email = email;
        this.roleType = roleType;
        this.purchaseHistory = purchaseHistory;
        this.cart = cart;
    }
    //-------------------------------
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    //-------------------------------
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    //-------------------------------
    getRoleType() {
        return this.roleType;
    }
    setRoleType(roleType) {
        this.roleType = roleType;
    }
    //-------------------------------
    getPurchaseHistory() {
        return this.purchaseHistory;
    }
    setPurchaseHistory(purchaseHistory) {
        this.purchaseHistory = purchaseHistory;
    }
    //-------------------------------
    getCart() {
        return this.cart;
    }
    setCart(cart) {
        this.cart = cart;
    }
}
exports.User = User;
