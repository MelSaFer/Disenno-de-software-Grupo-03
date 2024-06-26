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
    - getObject(categoryName: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
    - getSubcategory(categoryName: unknown, subcategoryName: unknown)
    - getSubcategories(categoryName: unknown)
    - addSubcategory(categoryName: unknown, object: any)
    - deleteSubcategory(categoryName: unknown, subcategoryName: unknown)
    - updateSubcategory(categoryName: unknown, object: any)
    - getSubcategory(categoryName: unknown, subcategoryName: unknown)
    - getSubcategories(categoryName: unknown)
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
        - error message: error message if there was no error
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
                    //console.log("No se encontraron carritos");
                    return {"name": "No se encontraron categorias"};
                }
                
            } catch (error) {
                //console.log(error);
                return {"name": "No se encontraron categorias"};
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
        - error if the Category was not found
    */
    async getObject(categoryName: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ categoryName: categoryName });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the category was found, return it, else return error message message
            if (Category) {
                console.log("Se encontro: " + JSON.stringify(Category, null, 2));
                return Category;
            } else {
                console.log("No se encontró el categoria con el código: " + categoryName);
                return {"name": "No se encontró el categorias"}; 
            }
        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el categorias"};
        }
    };

    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a Category in the database
    PARAMS:
        - object: Category
    RETURNS:
        - ok message if the Category was created
        - error message if the Category was not created
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
                //categoryName: object.categoryName,
                categoryName: object.categoryName,
                subcategories: object.subcategories
            });

            //Check if the category already exists
            const category = await collection.findOne({ categoryName: object.categoryName });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            if (category){
                //console.log("El categoria " +  object.categoryName + " ya existe");
                return {"name": "La categoria ya existe"};
            }
            
            //Insert the product in the database, convert it to JSON and parse it
            const newCategoryJson = JSON.stringify(newCategory);
            const newCategoryparsed = JSON.parse(newCategoryJson);
            await collection.insertOne(newCategoryparsed);
            //console.log("Se inserto: " + newCategoryJson);
            return {"name": "Se inserto la categoria" + newCategory.categoryName};
        } catch(err){
            //console.log(err);
            return {"name": "No se inserto la categoria"};
        }
    };

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - ok message if the product was updated
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
                    //categoryName: object.categoryName,
                    categoryName: object.categoryName,
                    subcategories: object.subcategories
                });

                //Verify existence of the category
                const category = await collection.findOne({ categoryName: updatedCategory.categoryName });
                if (!category){
                    console.log("El category " +  updatedCategory.categoryName + " no existe");
                    return {"name": "El category no existe"};
                }

                //Create the update object for updating the category
                const InfoToUpdate = {
                    $set: {
                        //categoryName: updatedCategory.categoryName,
                        categoryName: updatedCategory.categoryName,
                        subcategories: updatedCategory.subcategories
                        }
                };
                const result = await collection.updateOne({ categoryName: updatedCategory.categoryName }, InfoToUpdate); //Update the product in the database
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    //console.log("Contenido actualizado con éxito " + JSON.stringify(updatedCategory, null, 2));
                    return {"name": "Contenido actualizado con éxito"};
                } else {
                    //console.log("No se encontró el categoria para actualizar o no se actualizó ningun campo");
                    return {"name": "No se encontró el categoria para actualizar o no se actualizó ningun campo"};
                }
            } catch(err){
                //console.log(err);
                return {"name": "No se actualizó el categoria"};
            } //end try-catch
        };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - ok message if the product was deleted
        - error message if the product was not deleted
    */
    async delete(categoryName: unknown){
        try{
            console.log("code: " + categoryName);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);

            //Verify existence of the category
            const category = await collection.findOne({ categoryName: categoryName });
            if (!category){
                console.log("El category " +  categoryName + " no existe");
                return {"name": "El category no existe"};
            }
            //Delete the category in the database
            const result = await collection.deleteOne({ categoryName: categoryName });
            
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the category was deleted
            if (result.deletedCount > 0) {
                //console.log("Category eliminado con éxito");
                return {"name": "Category eliminado con éxito"};
            } else {
                //console.log("No se encontró el category para eliminar");
                return {"name": "No se encontró la categoria" + categoryName};
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se pudo eliminar el categoria"};
        }
    };

    /*
    -----------------------------------------------------------------------
    GET SUBCATEGORY METHOD
    Gets a subcateogry in the database
    PARAMS:
        - categoryName:  Number
        - subcategoryName: Number
    RETURNS:
        - subcategory if the subcategory was found
        - error message if the subcategory was not found
    */
    async getSubcategory(categoryName: unknown, subcategoryName: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ categoryName: categoryName });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the category was found, return it, else return false
            if (Category) {
                let subcategories = Category.subcategories;
                let subcategory = subcategories.find((subcategory: any) => subcategory.subcategoryName === subcategoryName);
                //if the subcategory was not found
                if (!subcategory){ 
                    //console.log("No se encontró la subcategoría con el código: " + subcategoryName);
                    return {"name": "No se encontró la subcategoría " + subcategoryName}; 
                }
                return subcategory;
            } else {
                //console.log("No se encontró el sub categoria " + subcategoryName);
                return {"name": "No se encontró el sub categoria " + subcategoryName}; 
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el sub categoria"};
        }
    };

    /*
    -----------------------------------------------------------------------
    GET SUBCATEGORIES METHOD
    Gets all the subcategories in of a category in the database
    PARAMS:
        - categoryName:  Number
    RETURNS:
        - subcategories if the subcategories were found
        - error message if the subcategories were not found
    */
    async getSubcategories(categoryName: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Get the Category from the database, using the code
            const Category = await collection.findOne({ categoryName: categoryName });
            // If the category was found, return it, else return false
            if (Category) {
                let subcategories = Category.subcategories;
                //console.log("Se encontro la subcategoría: " + JSON.stringify(subcategories, null, 2));
                return subcategories;
            } else {
                //console.log("No se encontró el subcategoria con el código: " + categoryName);
                return {"name": "No se encontró el subcategoria " + categoryName}; 
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el subcategoria"};
        }
    };

    /*
    -----------------------------------------------------------------------
    ADD SUBCATEGORY METHOD
    Adds a subcateogry in a category in the database
    PARAMS:
        - categoryName:  Number
        - object: Subcategory
    RETURNS:
        - ok message if the subcategory was added
        - error message if the subcategory was not added
    */
    async addSubcategory(categoryName: unknown, object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);
            //Check if the category already exists
            const category = await collection.findOne({ categoryName: categoryName});
            if (category){
                //Check if the subcategory already exists
                const subcategory = await this.getSubcategory(categoryName, object.subcategoryName);
                if(subcategory == false){ //if the subcategory does not exist
                    let newSubcategories = category.subcategories;
                    let newSubcategory = { subcategoryName: object.subcategoryName};
                    newSubcategories.push(newSubcategory);
                    console.log("La subcategoría " + object.subcategoryName + " se agregó a la categoría " + categoryName);
                    const result = await collection.updateOne({ categoryName: categoryName}, { $set: { subcategories: newSubcategories } });
                    return {"name": "La subcategoría " + object.subcategoryName + " se agregó a la categoría " + categoryName};
                }
                return {"name": "La subcategoría " + object.subcategoryName + " ya existe en la categoría " + categoryName};
            }
        } catch(err){
            //console.log(err);
            return {"name": "No se agregó la subcategoría a la categoría"};
        }
        return false;
    };

    /*
    -----------------------------------------------------------------------
    DELETE SUBCATEGORY METHOD
    Deletes a subcateogry in a category in the database
    PARAMS:
        - categoryName:  Number
        - subcategoryName: Number
    RETURNS:
        - ok message if the subcategory was deleted
        - error message if the subcategory was not deleted
    */
    async deleteSubcategory(categoryName: unknown, subcategoryName: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);

            //Check if the category already exists
            const category = await collection.findOne({ categoryName: categoryName});
            if (category){
                //Check if the subcategory already exists
                const subcategory = await this.getSubcategory(categoryName, subcategoryName);
                if(subcategory){
                    const newSubcategories = category.subcategories.filter((subcategory : any) => subcategory.subcategoryName !== subcategoryName);
                    //check if a subcategory was deleted
                    if (newSubcategories.length == category.subcategories.length) {
                        //console.log("No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName);
                        return {"name": "No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName};
                    }
                    //console.log("La subcategoría " + subcategoryName + " se elmino de la categoría " + categoryName);
                    const result = await collection.updateOne({ categoryName: categoryName}, { $set: { subcategories: newSubcategories } });
                    return {"name": "La subcategoría " + subcategoryName + " se eliminó de la categoría " + categoryName};
                } else {
                    //console.log("No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName);
                    return {"name": "No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName};
                }
            } else {
                //console.log("No se encontró la categoría " + categoryName);
                return {"name": "No se encontró la categoría " + categoryName};
            }

        }catch(err){
            //console.log(err);
            return {"name": "No se eliminó la subcategoría de la categoría"};
        }
    };

    /*
    -----------------------------------------------------------------------
    UPDATE SUBCATEGORY METHOD
    Updates a subcateogry in a category in the database
    PARAMS:
        - categoryName:  Number
        - object: Subcategory
    RETURNS:
        - ok message if the subcategory was updated
        - error message if the subcategory was not updated
    */
    async updateSubcategory(categoryName: unknown, object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CATEGORY_COLLECTION);

            //Check if the category already exists
            const category = await collection.findOne({ categoryName: categoryName});
            if (category){
                //Check if the subcategory already exists
                const subcategory = await this.getSubcategory(categoryName, object.subcategoryName);
                if(subcategory){
                    const newSubcategories = category.subcategories;
                    for(let i = 0; i < newSubcategories.length; i++){
                        if(newSubcategories[i].subcategoryName == object.subcategoryName){
                            newSubcategories[i].subcategoryName = object.subcategoryName;
                            break;
                        }
                    }
                    const result = await collection.updateOne({ categoryName: categoryName}, { $set: { subcategories: newSubcategories } });
                    return {"name": "La subcategoría " + object.subcategoryName + " se actualizó en la categoría " + categoryName};
                } else {
                    //console.log("No se encontró la subcategoría " + object.subcategoryName + " en la categoría " + categoryName);
                    return {"name": "No se encontró la subcategoría " + object.subcategoryName + " en la categoría " + categoryName};
                }
            } else {
                //console.log("No se encontró la categoría " + categoryName);
                return {"name": "No se encontró la categoría " + categoryName};
            }
        }catch(err){
            //console.log(err);
            return {"name": "No se actualizó la subcategoría de la categoría"};
        }
    };

}