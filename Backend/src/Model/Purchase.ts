/*
Class Purchase

*/

import {Product} from "./Product"
import {Image_} from "./Image_"
import {ShippingAddress} from "./ShippingAdress"

export class Purchase{
    private orderNumber: Number = 0;
    private purchaseDetails: String = "";
    private products: Product[] = [];
    private voucher: Image_ | undefined;
    private aproxDeliveryDate: Date | undefined;
    private shippingAdress: ShippingAddress | undefined;
    private shippingPrice: Number = 1;
    private state: String = "PENDING";


    public constructor(orderNumber: Number, purchaseDetails: String, 
        products: Product[], voucher: Image_, aproxDeliveryDate: Date, 
        shippingAdress: ShippingAddress, shippingPrice: Number, state: String){        
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