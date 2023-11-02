"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = void 0;
const DAOUser_1 = require("../DAO/DAOUser");
const DAOPurchase_1 = require("../DAO/DAOPurchase");
class AdminUser {
    constructor() { }
    /*
      METHOD ADD USER
      PARAMS: userId, email, roleType, cart
      */
    addUser(object) {
        try {
            const daoUser = new DAOUser_1.DAOUser();
            const user = daoUser.create(object);
            return user;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    getInfoUser(id) {
        try {
            const daoUser = new DAOUser_1.DAOUser();
            const user = daoUser.getObject(id);
            return user;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    /*
      METHOD UPDATE CART
      PARAMS: userId, productId, quantity
      */
    updateCart(userId, productId, quantity) {
        try {
            const daoUser = new DAOUser_1.DAOUser();
            const user = daoUser.updateCart(userId, productId, quantity);
            return user;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    /*
      METHOD GET CART
      PARAMS: userId
      */
    getCart(userId) {
        try {
            const daoUser = new DAOUser_1.DAOUser();
            const cart = daoUser.getCart(userId);
            return cart;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    /*
      METHOD GET PURCHASE HISTORY
      PARAMS: userId
      */
    getPurchaseHistory(userId) {
        try {
            const daoUser = new DAOUser_1.DAOUser();
            const purchasehistory = daoUser.getPurchaseHistory(userId);
            return purchasehistory;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    /*
      METHOD UPDATE STATE PURCHASE HISTORY
      PARAMS: userId, purchaseId, state
      */
    updatePurchaseState(userId, purchaseId, state) {
        try {
            const daoPurchase = new DAOPurchase_1.DAOPurchase();
            const purchase = daoPurchase.updatePurchaseState(userId, purchaseId, state);
            return purchase;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    /*
      METHOD MAKE PURCHASE
      PARAMS: userId, purchaseId, state
      */
    makePurchase(object) {
        try {
            const daoPurchase = new DAOPurchase_1.DAOPurchase();
            const purchase = daoPurchase.create(object);
            return purchase;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
}
exports.AdminUser = AdminUser;
