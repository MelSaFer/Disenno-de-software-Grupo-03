/**
 MAIN CONTROLLER
 */

import { AdminUser } from "./AdminUser";
import { AdminProduct } from "./AdminProduct";
import { AdminCategory } from "./AdminCategory";
import { AdminContent } from "./AdminContent";
import { AdminCalendar } from "./AdminCalendar";
//import axios from "axios";
import { API_URL } from '../config';



 export class MainController {

    //user------------------------------------------------------
    private adminUser: AdminUser | undefined;

    constructor(){}

    public async addUser(object: any){
        try{
            const adminUser = new AdminUser();
            const result = await adminUser.addUser(object);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

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

    public async getAllUsers(){
        try{
            const adminUser = new AdminUser();
            const result = await adminUser.getAllUsers();
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }
    }

    public async updateNotificationState(userId: number){
        try{
            const adminUser = new AdminUser();
            const result = await adminUser.updateNotificationState(userId);
            return result;
        } catch(err){
            console.log("Error al cargar las notificaciones del usuario", err);
        }
    }

    public async isUnread(userId: number){
        try{
            const adminUser = new AdminUser();
            const result = await adminUser.isUnread(userId);
            return result;
        } catch(err){
            console.log("Error al cargar las notificaciones del usuario", err);
        }
    }


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
    public async updatePurchaseState(userId : number, purchaseId: number, state: string, location: string){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.updatePurchaseState(userId, purchaseId, state, location);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD MAKE PURCHASE
    PARAMS: userId, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, state
    */
    public async makePurchase(object: any){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.makePurchase(object);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD GET NOTIFICATIONS
    PARAMS: userId
    */
    public async getNotifications(userId : number){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.getNotifications(userId);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    /*
    METHOD ADD NOTIFICATION
    PARAMS: userId, notification
    */
    public async addNotification(notification: any){
        try{
            const adminUser = new AdminUser();
            const result = adminUser.addNotification(notification);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    };

    // -----------------------------

    /*
    METHOD ADD CONTENT
    */
    public async addContent(object: any){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.addContent(object);
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
    public async updateContent(object: any){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.updateContent(object);
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

    public async getFilteredContent(categoryNames: string[], tags: string[]){
        try{
            const adminContent = new AdminContent();
            const result = adminContent.getFilteredContent(categoryNames, tags);
            return result;
        } catch(err){
            console.log("Error al cargar la info del usuario", err);
        }   
    }

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

    public async getProductByName(name_: any){
        try{
           const adminProduct = new AdminProduct();
           const result = adminProduct.getProductByName(name_);
           return result;
       } catch(err){
           console.log("Error al cargar la info del usuario", err);
       }
   };

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

    //CALENDAR------------------------------------------------------
    public async getCalendar(){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.getCalendar();
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    public async filterCalendar(object: any){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.filterCalendar(object);
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    public async createEvent(object: any){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.createEvent(object);
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    public async getEvent(object: any){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.getEvent(object);
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    public async updateEvent(object: any){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.updateEvent(object);
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    public async deleteEvent(object: any){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.deleteEvent(object);
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    public async verifyOverlap(object: any){
        try{
            const adminCalendar = new AdminCalendar();
            const result = await adminCalendar.verifyOverlap(object);
            return result;
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }   
    }

 }
