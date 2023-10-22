import { API_URL } from '../config';
import { DTOUser } from '../DTO/DTOUser';
import { DAOUser } from '../DAO/DAOUser';
import { DAOPurchase } from '../DAO/DAOPurchase';
import { DTOPurchase } from '../DTO/DTOPurchase';

export class AdminUser{


    constructor(){
        

    }

    getInfoUser(id: number){
        try {
            const daoUser = new DAOUser();
            const user = daoUser.getObject(id);
            return user;
        } catch (error) {
            console.log("Error", error);
        }
        

    }

    /*
    METHOD UPDATE CART
    PARAMS: userId, productId, quantity
    */
    updateCart(userId: number, productId: number, quantity: number){
        try {
            const daoUser = new DAOUser();
            const user = daoUser.updateCart(userId, productId, quantity);
            return user;
        } catch (error) {
            console.log("Error", error);
        }
        
    }

    /*
    METHOD GET CART
    PARAMS: userId
    */
    getCart(userId: number){
        try {
            const daoUser = new DAOUser();
            const cart = daoUser.getCart(userId);
            return cart;
        } catch (error) {
            console.log("Error", error);
        }
        
    }

    /*
    METHOD GET PURCHASE HISTORY
    PARAMS: userId
    */
    getPurchaseHistory(userId: number){
        try {
            const daoUser = new DAOUser();
            const purchasehistory = daoUser.getPurchaseHistory(userId);
            return purchasehistory;
        } catch (error) {
            console.log("Error", error);
        }
        
    }

    /*
    METHOD UPDATE STATE PURCHASE HISTORY
    PARAMS: userId, purchaseId, state
    */
    updatePurchaseState(userId: number, purchaseId: number, state: string){
        try {
            const daoPurchase = new DAOPurchase();
            const purchase = daoPurchase.updatePurchaseState(userId, purchaseId, state);
            return purchase;
        } catch (error) {
            console.log("Error", error);
        }
        
    }

    /*
    METHOD MAKE PURCHASE
    PARAMS: userId, purchaseId, state
    */
    makePurchase(purchaseId: number, purchaseDetails: string, products: any[], voucher: string, aproxDeliveryDate: Date, shippingAdress: any, shippingPrice: number, userId: number, state: string){
        try {
            const daoPurchase = new DAOPurchase();
            const dtoPurchase = new DTOPurchase(purchaseId, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, userId, state);
            const purchase = daoPurchase.create(dtoPurchase);
            return purchase;
        } catch (error) {
            console.log("Error", error);
        }
        
    }


}