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

    async addProduct (product: any){
        try{
            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                body: JSON.stringify(product)
            });
            const data = await response.json();
            this.cart = data;
            return data;
        }catch(err){
            console.log("Error al agregar el producto", err);
        }
    }

    async updateProduct (product: any, quantity: number){
        try{
            if (quantity < 1 || quantity > product.stock){ //!!!
                this.deleteProduct(product.id);
                return;
            }

            const response = await fetch(`${API_URL}/cart/${product}/${quantity}`, {
                method: 'PUT',
                body: JSON.stringify(product)
            });
            const data = await response.json();
            this.cart = data;
            return data;
        }catch(err){
            console.log("Error al actualizar el producto", err);
        }
    }

    async deleteProduct (id: any){
        try{
            const response = await fetch(`${API_URL}/cart/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            this.cart = data;
            return data;
        }catch(err){
            console.log("Error al eliminar el producto", err);
        }
    }
}