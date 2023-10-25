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

    //SUBCATEGORY------------------------------------------------------
    public async getSubCategories(categoryId : unknown){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.getSubcategories(categoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async getSubcategory(categoryId : unknown, subCategoryId : unknown){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.getSubcategory(categoryId, subCategoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async addSubCategory(categoryId: unknown, object: any){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.addSubcategory(categoryId, object);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    public async deleteSubCategory(categoryId: unknown, subcategoryId: any){
        try{
            const daoCategory = new DAOCategory();
            const result = await daoCategory.deleteSubcategory(categoryId, subcategoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

    updateSubCategory(categoryId: unknown, object: any){
        try{
            const daoCategory = new DAOCategory();
            const result = daoCategory.updateSubcategory(categoryId, object);
            return result;
        } catch(err){
            console.log("Error al cargar la información de la categoría", err);
        }
    }

   
}