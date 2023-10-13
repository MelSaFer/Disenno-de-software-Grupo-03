"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
class Purchase {
    constructor(orderNumber, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice) {
        this.orderNumber = 0;
        this.purchaseDetails = "";
        this.products = [];
        this.shippingPrice = 1;
        this.orderNumber = orderNumber;
        this.purchaseDetails = purchaseDetails;
        this.products = products;
        this.voucher = voucher;
        this.aproxDeliveryDate = aproxDeliveryDate;
        this.shippingAdress = shippingAdress;
        this.shippingPrice = shippingPrice;
    }
}
exports.Purchase = Purchase;
