/**
 MAIN CONTROLLER
 */

import { AdminUser } from "./AdminUser";
import { AdminProduct } from "./AdminProduct";
import { AdminCategory } from "./AdminCategory";
import { AdminContent } from "./AdminContent";
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

    /*
    METHOD MAKE PURCHASE
    PARAMS: userId, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, state
    */
    public async makePurchase(purchaseId: number, purchaseDetails: string, products: any[], voucher: string, aproxDeliveryDate: Date, shippingAdress: any, shippingPrice: number, userId: number, state: string){
        try{
            //Verify state is valid
            if (state != "PENDING" && state != "CHECKED" && state != "DELIVERED" && state != "SEND"){
                console.log("El estado ingresado no es válido");
                return false;
            }

            const adminUser = new AdminUser();
            const result = adminUser.makePurchase(purchaseId, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, userId, state);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    // -----------------------------

    /*
    METHOD ADD CONTENT
    */
    public async addContent(contentId: number, title: string, description: string, date: Date, imageId: number, categoryId: number, tags: []){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.addContent(contentId, title, description, date, imageId, categoryId, tags);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD GET ALL CONTENT
    */
    public async getAllContent(){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.getAllContent();
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD GET CONTENT BY ID
    */
    public async getContent(contentId: number){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.getContent(contentId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD UPDATE CONTENT
    */
    public async updateContent(contentId: number, title: string, description: string, date: Date, imageId: number, categoryId: number, tags: []){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.updateContent(contentId, title, description, date, imageId, categoryId, tags);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD DELETE CONTENT
    */
    public async deleteContent(contentId: number){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.deleteContent(contentId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    // -----------------------------


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

    public async deleteProduct(id: number){
        try{
            const adminProduct = new AdminProduct();
            const result = await adminProduct.deleteProduct(id);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    public async addProduct(object: any){
        try{
            const adminProduct = new AdminProduct();
            const result = await adminProduct.addProduct(object);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    //CATEGORY------------------------------------------------------
    public async addCategory(object: any){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.addCategory(object);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    public async getCategories(){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.getCategories();
            return result;
        } catch(err){
            console.log("Error al cargar las categorias", err);
        }   
    }

    public async updateCategory(object: any){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.updateCategory(object);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    public async getCategory(categoryId: unknown){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.getCategory(categoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

    public async deleteCategory(categoryId: unknown){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.deleteCategory(categoryId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }
    

    //SUBCATEGORY------------------------------------------------------
    public async getSubCategories(categoryId : unknown){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.getSubCategories(categoryId);
            return result;
        } catch(err){
            console.log("Error al cargar las categorias", err);
        }   
    }

    public async getSubcategory(categoryId : unknown, subCategoryId : unknown){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.getSubcategory(categoryId, subCategoryId);
            return result;
        } catch(err){
            console.log("Error al cargar las categorias", err);
        }   
    }

    public async addSubCategory(categoryId: unknown, object: any){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.addSubCategory(categoryId, object);
            return result;
        } catch(err){
            console.log("Error al cargar las categorias", err);
        }   
    }

    public async deleteSubCategory(categoryId: unknown, subcategoryId: any){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.deleteSubCategory(categoryId, subcategoryId);
            return result;
        } catch(err){
            console.log("Error al cargar las categorias", err);
        }   
    }

    public async updateSubCategory(categoryId: unknown, object: any){
        try{
            const adminCategory = new AdminCategory();
            const result = await adminCategory.updateSubCategory(categoryId, object);
            return result;
        } catch(err){
            console.log("Error al cargar las categorias", err);
        }   
    }

 }