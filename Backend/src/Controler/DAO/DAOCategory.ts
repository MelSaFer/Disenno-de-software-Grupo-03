import {DAO} from "./DAO"
import {categorySchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CATEGORY_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
 DAO CATEGORY
 Class for managing the connection to the database and the queries related
  to the category
 METHODS:
    - getAll()
    - getObject(code_: unknown)
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
    async getObject(code_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ idCategory: code_ });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the category was found, return it, else return false
            if (Category) {
                console.log("Se encontro: " + JSON.stringify(Category, null, 2));
                return Category;
            } else {
                console.log("No se encontró el categoria con el código: " + code_);
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
            const Category = mongoose.model('Category', categorySchema);

            //Create a new category with the object received
            let newCategory = new Category({
                idCategory: object.idCategory,
                name: object.name,
                subcategories: object.subcategories
            });

            //Check if the category already exists
            const category = await collection.findOne({ idCategory: object.idCategory });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            if (category){
                console.log("El categoria " +  object.idCategory + " ya existe");
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
                const Category = mongoose.model('Category', categorySchema);

                //Create a new product with the object received
                let updatedCategory = new Category({
                    idCategory: object.idCategory,
                    name: object.name,
                    subcategories: object.subcategories
                });

                //Verify existence of the category
                const category = await collection.findOne({ idCategory: updatedCategory.idCategory });
                if (!category){
                    console.log("El category " +  updatedCategory.idCategory + " no existe");
                    return false;
                }

                //Create the update object for updating the category
                const InfoToUpdate = {
                    $set: {
                        idCategory: updatedCategory.idCategory,
                        name: updatedCategory.name,
                        subcategories: updatedCategory.subcategories
                        }
                };
                const result = await collection.updateOne({ idCategory: updatedCategory.idCategory }, InfoToUpdate); //Update the product in the database
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
    async delete(code_: unknown){
        try{
            console.log("code: " + code_);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);

            //Verify existence of the category
            const category = await collection.findOne({ idCategory: code_ });
            if (!category){
                console.log("El category " +  code_ + " no existe");
                return false;
            }
            //Delete the category in the database
            const result = await collection.deleteOne({ idCategory: code_ });
            
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
}