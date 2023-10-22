import { DAOCategory } from '../DAO/DAOCategory';
import { API_URL } from '../config';

export class AdminCategory{

    constructor(){}

    public async addCategory(object: any){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.create(object);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async getCategories(){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.getAll();
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async updateCategory(object: any){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.update(object);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async getCategory(categoryId : unknown){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.getObject(categoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async deleteCategory(categoryId : unknown){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.delete(categoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

   
}