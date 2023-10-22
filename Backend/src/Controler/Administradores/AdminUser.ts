import { API_URL } from '../config';
import { DTOUser } from '../DTO/DTOUser';
import { DAOUser } from '../DAO/DAOUser';
import { DAOPurchase } from '../DAO/DAOPurchase';

export class AdminUser{


    constructor(){
        

    }

    getInfoUser(id: number){
        console.log(id)
        //const dtoUser = new DTOUser(1,1,[]);
        //return "esto es una prueba2.0";
        const daoUser = new DAOUser();
        const user = daoUser.getObject(id);
        return user;

    }

    /*
    METHOD UPDATE CART
    PARAMS: userId, productId, quantity
    */
    updateCart(userId: number, productId: number, quantity: number){
        const daoUser = new DAOUser();
        const user = daoUser.updateCart(userId, productId, quantity);
        return user;
    }

    /*
    METHOD GET CART
    PARAMS: userId
    */
    getCart(userId: number){
        const daoUser = new DAOUser();
        const user = daoUser.getCart(userId);
        return user;
    }

    /*
    METHOD GET PURCHASE HISTORY
    PARAMS: userId
    */
    getPurchaseHistory(userId: number){
        const daoUser = new DAOUser();
        const user = daoUser.getPurchaseHistory(userId);
        return user;
    }

    /*
    METHOD UPDATE STATE PURCHASE HISTORY
    PARAMS: userId, purchaseId, state
    */
    updatePurchaseState(userId: number, purchaseId: number, state: string){
        const daoPurchase = new DAOPurchase();
        const purchase = daoPurchase.updatePurchaseState(userId, purchaseId, state);
        return purchase;
    }


}