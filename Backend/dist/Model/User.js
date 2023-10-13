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
        this.name = "";
        this.email = "";
        this.password = "";
        this.roleType = 0;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
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
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    //-------------------------------
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    //-------------------------------
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
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
