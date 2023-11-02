"use strict";
/*
Class User

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOUser = void 0;
class DTOUser {
    //-------------------------------
    constructor(userId, roleType, cart) {
        this.userId = 0;
        this.roleType = 0;
        this.cart = [];
        this.userId = userId;
        this.roleType = roleType;
        this.cart = cart;
    }
}
exports.DTOUser = DTOUser;
