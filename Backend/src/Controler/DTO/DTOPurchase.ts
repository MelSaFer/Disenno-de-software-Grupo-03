/*
Class Purchase

*/

export class Purchase{
    private orderNumber: Number = 0;
    private purchaseDetails: String = "";
    private products  = [];
    private voucher = null;
    private aproxDeliveryDate: Date | undefined;
    private shippingAdress = null;
    private shippingPrice: Number = 1;


    public constructor(orderNumber: Number, purchaseDetails: String, 
        products: [], voucher: any, aproxDeliveryDate: Date, 
        shippingAdress: any, shippingPrice: Number){        
        this.orderNumber = orderNumber;
        this.purchaseDetails = purchaseDetails;
        this.products = products;
        this.voucher = voucher;
        this.aproxDeliveryDate = aproxDeliveryDate;
        this.shippingAdress = shippingAdress;
        this.shippingPrice = shippingPrice;
    }

}