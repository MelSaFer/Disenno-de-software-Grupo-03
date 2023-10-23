import {DAO} from "./DAO"
import {CategorySchema, SubcategorySchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CATEGORY_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
 DAO CATEGORY
 Class for managing the connection to the database and the queries related
  to the category
 METHODS:
    - getAll()
    - getObject(categoryId: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/

export class DAOCategory implements DAO{
    constructor(){};

    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the categories in the database
    PARAMS:
        - none
    RETURNS:
        - categories: array of categories
    */
        async getAll(){
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(CATEGORY_COLLECTION);
            
                //Get the categories from the database, using the code
                let categories = await collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
    
                if (categories) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(categories, null, 2));
                    return categories;
                }
                else{
                    console.log("No se encontraron carritos");
                    return false;
                }
                
                
    
            } catch (error) {
                console.log(error);
                return false;
            }
            
    
        };

    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a Category in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - Category if the Category was found
        - false if the Category was not found
    */
    async getObject(categoryId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ categoryId: categoryId });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the category was found, return it, else return false
            if (Category) {
                console.log("Se encontro: " + JSON.stringify(Category, null, 2));
                return Category;
            } else {
                console.log("No se encontró el categoria con el código: " + categoryId);
                return false; 
            }

        } catch(err){
            console.log(err);
            return false;
        }
    };

    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a Category in the database
    PARAMS:
        - object: Category
    RETURNS:
        - true if the Category was created
        - false if the Category was not created
    */
    async create(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            const Category = mongoose.model('Category', CategorySchema);

            //Create a new category with the object received
            let newCategory = new Category({
                categoryId: object.categoryId,
                name: object.name,
                subcategories: object.subcategories
            });

            //Check if the category already exists
            const category = await collection.findOne({ categoryId: object.categoryId });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            if (category){
                console.log("El categoria " +  object.categoryId + " ya existe");
                return false;
            }
            
            //Insert the product in the database, convert it to JSON and parse it
            const newCategoryJson = JSON.stringify(newCategory);
            const newCategoryparsed = JSON.parse(newCategoryJson);
            await collection.insertOne(newCategoryparsed);
            console.log("Se inserto: " + newCategoryJson);
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    };

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - true if the product was updated
        - false if the product was not updated
    */
        async update(object: any){
            try{
                //Mongo connection with singleton
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);  
                const collection = db.collection(CATEGORY_COLLECTION);
                
                //Get the model from the database with the schema
                const Category = mongoose.model('Category', CategorySchema);

                //Create a new product with the object received
                let updatedCategory = new Category({
                    categoryId: object.categoryId,
                    name: object.name,
                    subcategories: object.subcategories
                });

                //Verify existence of the category
                const category = await collection.findOne({ categoryId: updatedCategory.categoryId });
                if (!category){
                    console.log("El category " +  updatedCategory.categoryId + " no existe");
                    return false;
                }

                //Create the update object for updating the category
                const InfoToUpdate = {
                    $set: {
                        categoryId: updatedCategory.categoryId,
                        name: updatedCategory.name,
                        subcategories: updatedCategory.subcategories
                        }
                };
                const result = await collection.updateOne({ categoryId: updatedCategory.categoryId }, InfoToUpdate); //Update the product in the database
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    console.log("Contenido actualizado con éxito " + JSON.stringify(updatedCategory, null, 2));
                    return true;
                } else {
                    console.log("No se encontró el categoria para actualizar o no se actualizó ningun campo");
                    return false;
                }
            } catch(err){
                console.log(err);
            } //end try-catch
            return true;
        };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - true if the product was deleted
        - false if the product was not deleted
    */
    async delete(categoryId: unknown){
        try{
            console.log("code: " + categoryId);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);

            //Verify existence of the category
            const category = await collection.findOne({ categoryId: categoryId });
            if (!category){
                console.log("El category " +  categoryId + " no existe");
                return false;
            }
            //Delete the category in the database
            const result = await collection.deleteOne({ categoryId: categoryId });
            
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the category was deleted
            if (result.deletedCount > 0) {
                console.log("Category eliminado con éxito");
                return true;
            } else {
                console.log("No se encontró el category para eliminar");
                return false;
            }

        } catch(err){
            console.log(err);
        }
        return true;
    };

    async getSubcategory(categoryId: unknown, subcategoryId: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ categoryId: categoryId });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the category was found, return it, else return false
            if (Category) {
                let subcategories = Category.subcategories;
                let subcategory = subcategories.find((subcategory: any) => subcategory.subcategoryId === subcategoryId);
                if (!subcategory){ 
                    console.log("No se encontró la subcategoría con el código: " + subcategoryId);
                    return false; 
                }
                return subcategory;
            } else {
                console.log("No se encontró el sub categoria con el código: " + subcategoryId);
                return false; 
            }

        } catch(err){
            console.log(err);
            return false;
        }
    };

    async getSubcategories(categoryId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ categoryId: categoryId });
            // If the category was found, return it, else return false
            if (Category) {
                let subcategories = Category.subcategories;
                console.log("Se encontro la subcategoría: " + JSON.stringify(subcategories, null, 2));
                return subcategories;
            } else {
                console.log("No se encontró el subcategoria con el código: " + categoryId);
                return false; 
            }

        } catch(err){
            console.log(err);
            return false;
        }
    };

    async addSubcategory(categoryId: unknown, object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Check if the category already exists
            const category = await collection.findOne({ categoryId: categoryId});
            if (category){
                //Check if the subcategory already exists
                const subcategory = await this.getSubcategory(categoryId, object.subcategoryId);
                if(subcategory == false){
                    let newSubcategories = category.subcategories;
                    let newSubcategory = { subcategoryId: object.subcategoryId, name: object.name };
                    newSubcategories.push(newSubcategory);
                    console.log("La subcategoría " + object.subcategoryId + " se agregó a la categoría " + categoryId);
                    const result = await collection.updateOne({ categoryId: categoryId}, { $set: { subcategories: newSubcategories } });
                    return true;
                }
                return false;
            }
        } catch(err){
            console.log(err);
        }
        return false;
    };

    async deleteSubcategory(categoryId: unknown, subcategoryId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);

            //Check if the category already exists
            const category = await collection.findOne({ categoryId: categoryId});
            if (category){
                //Check if the subcategory already exists
                const subcategory = await this.getSubcategory(categoryId, subcategoryId);
                if(subcategory){
                    //let newSubcategories = category.subcategories;
                    const newSubcategories = category.subcategories.filter((subcategory : any) => subcategory.subcategoryId !== subcategoryId);
                    if (newSubcategories.length == category.subcategories.length) {
                        console.log("No se encontró la subcategoría " + subcategoryId + " en la categoría " + categoryId);
                        return false;
                    }
                    //newSubcategories.push(newSubcategory);
                    console.log("La subcategoría " + subcategoryId + " se elmino de la categoría " + categoryId);
                    const result = await collection.updateOne({ categoryId: categoryId}, { $set: { subcategories: newSubcategories } });
                    return true;
                } else {
                    console.log("No se encontró la subcategoría " + subcategoryId + " en la categoría " + categoryId);
                    return false;
                }
            } else {
                console.log("No se encontró la categoría " + categoryId);
                return false;
            }

        }catch(err){
            console.log(err);
        }
    };

}