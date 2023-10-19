import { API_URL } from '../config';

export class AdminProduct{
    catalogue = [];

    constructor(){
        this.catalogue = [];
    }

    async loadCatalogue(){
        try{
            const response = await fetch(`${API_URL}/products`, {method: 'GET'});
            const data = await response.json();
            this.catalogue = data;
            return data;
        }catch(err){
            console.log("Error al cargar el catálogo", err);
        }
    }
}