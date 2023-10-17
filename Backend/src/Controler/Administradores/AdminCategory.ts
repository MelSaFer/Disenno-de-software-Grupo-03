import { API_URL } from '../config';

export class AdminCategory{
    categories = [];


    constructor(){}

    async loadCategories(){
        try{
            const response = await fetch(`${API_URL}/categories`, {method: 'GET'});
            const data = await response.json();
            this.categories = data;
            return data;
        }catch(err){
            console.log("Error al cargar las categorias", err);
        }
    }
}