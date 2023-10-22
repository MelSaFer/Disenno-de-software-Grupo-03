/**
 MAIN CONTROLLER
 */

import { AdminUser } from "./AdminUser";
import { AdminProduct } from "./AdminProduct";
//import axios from "axios";
import { API_URL } from '../config';



 export class MainController {

    //user------------------------------------------------------
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


    //STORE------------------------------------------------------
    public async getCatalogue(){
        try{
            const adminProduct = new AdminProduct();
            const result = adminProduct.getAllProducts();
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    public async getProduct(id: number){
        try{
            const adminProduct = new AdminProduct();
            const result = adminProduct.getProduct(id);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    public async updateProduct(object: any){
        try{
            const adminProduct = new AdminProduct();
            const result = await adminProduct.updateProduct(object);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

 }