"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = void 0;
const config_1 = require("../config");
const DAOUser_1 = require("../DAO/DAOUser");
const DAOPurchase_1 = require("../DAO/DAOPurchase");
const NotificationCenter_1 = require("./NotificationCenter");
class AdminUser {
    constructor() {
        this.observers = [];
        this.observers[0] = new NotificationCenter_1.NotificationCenter();
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1)
            this.observers.splice(index, 1);
    }
    notify(body) {
        for (const observer of this.observers)
            observer.update(this, body);
    }
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
    updatePurchaseState(userId, purchaseId, state, location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoPurchase = new DAOPurchase_1.DAOPurchase();
                const purchase = yield daoPurchase.updatePurchaseState(userId, purchaseId, state, location);
                // Notificar a los observadores
                if (purchase.name == state && (state == config_1.ACCEPTED_STATE || state == config_1.DECLINED_STATE)) {
                    this.notify({ userId: userId, purchaseId: purchaseId, state: state });
                }
                return purchase;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
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
    /*
      METHOD GET NOTIFICATIONS
      PARAMS: userId
      */
    getNotifications(userId) {
        try {
            const daoUser = new DAOUser_1.DAOUser();
            const notifications = daoUser.getNotifications(userId);
            return notifications;
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoUser = new DAOUser_1.DAOUser();
                const users = yield daoUser.getAll();
                return users;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    updateNotificationState(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoUser = new DAOUser_1.DAOUser();
                const notification = yield daoUser.updateNotificationState(userId);
                return notification;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    isUnread(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoUser = new DAOUser_1.DAOUser();
                const unread = yield daoUser.isUnread(userId);
                return unread;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    addNotification(notification_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoUser = new DAOUser_1.DAOUser();
                const notification = yield daoUser.addNotification(notification_);
                return notification;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
}
exports.AdminUser = AdminUser;
