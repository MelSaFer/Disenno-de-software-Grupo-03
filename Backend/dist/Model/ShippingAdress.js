"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingAddress = void 0;
class ShippingAddress {
    constructor(province, canton, district, preciseDirection) {
        this.province = "None";
        this.canton = "None";
        this.district = "None";
        this.preciseDirection = "None";
        this.province = province;
        this.canton = canton;
        this.district = district;
        this.preciseDirection = preciseDirection;
    }
}
exports.ShippingAddress = ShippingAddress;
