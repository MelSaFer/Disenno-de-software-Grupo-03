"use strict";
/*
Class Purchase

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
class Purchase {
    constructor(orderNumber, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, state) {
        this.orderNumber = 0;
        this.purchaseDetails = "";
        this.products = [];
        this.shippingPrice = 1;
        this.state = "PENDING";
        this.orderNumber = orderNumber;
        this.purchaseDetails = purchaseDetails;
        this.products = products;
        this.voucher = voucher;
        this.aproxDeliveryDate = aproxDeliveryDate;
        this.shippingAdress = shippingAdress;
        this.shippingPrice = shippingPrice;
        this.state = state;
    }
}
exports.Purchase = Purchase;
