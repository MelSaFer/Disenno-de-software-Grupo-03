/**
 MAIN CONTROLLER
 */

import { AdminUser } from "./AdminUser";
import axios from "axios";
import { API_URL } from '../config';



 export class MainController {
    private adminUser: AdminUser | undefined;

    constructor(){}

    public async getInfoUser(id: number){
        try{
            //const userId = 2;
            const url =`${API_URL}/infoUser`
            const response = await axios.get(url);
            const data = await response.data;
            const adminUser = new AdminUser();
            const result = adminUser.getInfoUser(data);
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

 }