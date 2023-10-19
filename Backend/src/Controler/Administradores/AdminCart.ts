import { API_URL } from '../config';

export class AdminCart{
    cart = [];

    constructor(){
        this.cart = [];
    }

    async loadCart(){
        try{
            const response = await fetch(`${API_URL}/cart`, {method: 'GET'});
            const data = await response.json();
            this.cart = data;
            return data;
        }catch(err){
            console.log("Error al cargar el carrito", err);
        }
    }
}