/*
Class Purchase

*/

export class DTOPurchase{
    private purchaseId: number = 0;
    private purchaseDetails: string = "";
    private products: any[];
    private voucherId = "";
    private aproxDeliveryDate: Date | undefined | string;
    private shippingAdress = null;
    private shippingPrice: number = 1;
    private userId = 0;
    private state = "";


    public constructor(purchaseId: number, purchaseDetails: string, 
        products: any[], voucher: string, aproxDeliveryDate: Date | string, 
        shippingAdress: any, shippingPrice: number, userId: number, state: string){        
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