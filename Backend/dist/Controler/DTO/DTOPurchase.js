"use strict";
/*
Class Purchase

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOPurchase = void 0;
class DTOPurchase {
    constructor(purchaseId, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, userId, state) {
        this.purchaseId = 0;
        this.purchaseDetails = "";
        this.voucherId = "";
        this.shippingAdress = null;
        this.shippingPrice = 1;
        this.userId = 0;
        this.state = "";
        this.purchaseId = purchaseId;
        this.purchaseDetails = purchaseDetails;
        this.products = products;
        this.voucherId = voucher;
        this.aproxDeliveryDate = aproxDeliveryDate;
        this.shippingAdress = shippingAdress;
        this.shippingPrice = shippingPrice;
        this.userId = userId;
        this.state = state;
    }
}
exports.DTOPurchase = DTOPurchase;
