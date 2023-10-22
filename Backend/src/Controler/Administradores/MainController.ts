/**
 MAIN CONTROLLER
 */

import { AdminUser } from "./AdminUser";
//import axios from "axios";
import { API_URL } from '../config';



 export class MainController {
    private adminUser: AdminUser | undefined;

    constructor(){}

    public async getInfoUser(id: number){
        try{
            console.log(id);
            const adminUser = new AdminUser();
            const result = adminUser.getInfoUser(id);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }
        
    };

    public async postInfoUser(id: number){
        try{
            
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    public async updateCart(userId : number, productId: number, quantity: number){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.updateCart(userId , productId, quantity);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    // -----------------------------

    /*
    METHOD GET CART
    PARAMS: userId
    */
    public async getCart(userId : number){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.getCart(userId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD GET PURCHASE HISTORY
    PARAMS: userId
    */
    public async getPurchaseHistory(userId : number){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.getPurchaseHistory(userId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD PUT PURCHASE STATE
    PARAMS: userId, purchaseId, state
    */
    public async updatePurchaseState(userId : number, purchaseId: number, state: string){
        try{
            //Verify state is valid
            if (state != "PENDING" && state != "CHECKED" && state != "DELIVERED" && state != "SEND"){
                console.log("El estado ingresado no es válido");
                return false;
            }

            const adminUser = new AdminUser();
            const result = adminUser.updatePurchaseState(userId, purchaseId, state);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

 }