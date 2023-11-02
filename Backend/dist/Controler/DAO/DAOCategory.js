"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOCategory = void 0;
const Schemas_1 = require("./schemas/Schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const SingletonMongo_1 = require("../Singleton/SingletonMongo");
const config_1 = require("../config");
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
class DAOCategory {
    constructor() { }
    ;
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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Get the categories from the database, using the code
                let categories = yield collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (categories) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(categories, null, 2));
                    return categories;
                }
                else {
                    //console.log("No se encontraron carritos");
                    return { "name": "No se encontraron categorias" };
                }
            }
            catch (error) {
                //console.log(error);
                return { "name": "No se encontraron categorias" };
            }
        });
    }
    ;
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
    getObject(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Get the Category from the database, using the code
                const Category = yield collection.findOne({ categoryName: categoryName });
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                // If the category was found, return it, else return error message message
                if (Category) {
                    console.log("Se encontro: " + JSON.stringify(Category, null, 2));
                    return Category;
                }
                else {
                    console.log("No se encontró el categoria con el código: " + categoryName);
                    return { "name": "No se encontró el categorias" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el categorias" };
            }
        });
    }
    ;
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
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                const Category = mongoose_1.default.model('Category', Schemas_1.CategorySchema);
                //Create a new category with the object received
                let newCategory = new Category({
                    //categoryName: object.categoryName,
                    categoryName: object.categoryName,
                    subcategories: object.subcategories
                });
                //Check if the category already exists
                const category = yield collection.findOne({ categoryName: object.categoryName });
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (category) {
                    //console.log("El categoria " +  object.categoryName + " ya existe");
                    return { "name": "La categoria ya existe" };
                }
                //Insert the product in the database, convert it to JSON and parse it
                const newCategoryJson = JSON.stringify(newCategory);
                const newCategoryparsed = JSON.parse(newCategoryJson);
                yield collection.insertOne(newCategoryparsed);
                //console.log("Se inserto: " + newCategoryJson);
                return { "name": "Se inserto la categoria" + newCategory.categoryName };
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se inserto la categoria" };
            }
        });
    }
    ;
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
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Mongo connection with singleton
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Get the model from the database with the schema
                const Category = mongoose_1.default.model('Category', Schemas_1.CategorySchema);
                //Create a new product with the object received
                let updatedCategory = new Category({
                    //categoryName: object.categoryName,
                    categoryName: object.categoryName,
                    subcategories: object.subcategories
                });
                //Verify existence of the category
                const category = yield collection.findOne({ categoryName: updatedCategory.categoryName });
                if (!category) {
                    console.log("El category " + updatedCategory.categoryName + " no existe");
                    return { "name": "El category no existe" };
                }
                //Create the update object for updating the category
                const InfoToUpdate = {
                    $set: {
                        //categoryName: updatedCategory.categoryName,
                        categoryName: updatedCategory.categoryName,
                        subcategories: updatedCategory.subcategories
                    }
                };
                const result = yield collection.updateOne({ categoryName: updatedCategory.categoryName }, InfoToUpdate); //Update the product in the database
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    //console.log("Contenido actualizado con éxito " + JSON.stringify(updatedCategory, null, 2));
                    return { "name": "Contenido actualizado con éxito" };
                }
                else {
                    //console.log("No se encontró el categoria para actualizar o no se actualizó ningun campo");
                    return { "name": "No se encontró el categoria para actualizar o no se actualizó ningun campo" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se actualizó el categoria" };
            } //end try-catch
        });
    }
    ;
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
    delete(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("code: " + categoryName);
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Verify existence of the category
                const category = yield collection.findOne({ categoryName: categoryName });
                if (!category) {
                    console.log("El category " + categoryName + " no existe");
                    return { "name": "El category no existe" };
                }
                //Delete the category in the database
                const result = yield collection.deleteOne({ categoryName: categoryName });
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the category was deleted
                if (result.deletedCount > 0) {
                    //console.log("Category eliminado con éxito");
                    return { "name": "Category eliminado con éxito" };
                }
                else {
                    //console.log("No se encontró el category para eliminar");
                    return { "name": "No se encontró la categoria" + categoryName };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se pudo eliminar el categoria" };
            }
        });
    }
    ;
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
    getSubcategory(categoryName, subcategoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Get the Category from the database, using the code
                const Category = yield collection.findOne({ categoryName: categoryName });
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                // If the category was found, return it, else return false
                if (Category) {
                    let subcategories = Category.subcategories;
                    let subcategory = subcategories.find((subcategory) => subcategory.subcategoryName === subcategoryName);
                    //if the subcategory was not found
                    if (!subcategory) {
                        //console.log("No se encontró la subcategoría con el código: " + subcategoryName);
                        return { "name": "No se encontró la subcategoría " + subcategoryName };
                    }
                    return subcategory;
                }
                else {
                    //console.log("No se encontró el sub categoria " + subcategoryName);
                    return { "name": "No se encontró el sub categoria " + subcategoryName };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el sub categoria" };
            }
        });
    }
    ;
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
    getSubcategories(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Get the Category from the database, using the code
                const Category = yield collection.findOne({ categoryName: categoryName });
                // If the category was found, return it, else return false
                if (Category) {
                    let subcategories = Category.subcategories;
                    //console.log("Se encontro la subcategoría: " + JSON.stringify(subcategories, null, 2));
                    return subcategories;
                }
                else {
                    //console.log("No se encontró el subcategoria con el código: " + categoryName);
                    return { "name": "No se encontró el subcategoria " + categoryName };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el subcategoria" };
            }
        });
    }
    ;
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
    addSubcategory(categoryName, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Check if the category already exists
                const category = yield collection.findOne({ categoryName: categoryName });
                if (category) {
                    //Check if the subcategory already exists
                    const subcategory = yield this.getSubcategory(categoryName, object.subcategoryName);
                    if (subcategory == false) { //if the subcategory does not exist
                        let newSubcategories = category.subcategories;
                        let newSubcategory = { subcategoryName: object.subcategoryName };
                        newSubcategories.push(newSubcategory);
                        console.log("La subcategoría " + object.subcategoryName + " se agregó a la categoría " + categoryName);
                        const result = yield collection.updateOne({ categoryName: categoryName }, { $set: { subcategories: newSubcategories } });
                        return { "name": "La subcategoría " + object.subcategoryName + " se agregó a la categoría " + categoryName };
                    }
                    return { "name": "La subcategoría " + object.subcategoryName + " ya existe en la categoría " + categoryName };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se agregó la subcategoría a la categoría" };
            }
            return false;
        });
    }
    ;
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
    deleteSubcategory(categoryName, subcategoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Check if the category already exists
                const category = yield collection.findOne({ categoryName: categoryName });
                if (category) {
                    //Check if the subcategory already exists
                    const subcategory = yield this.getSubcategory(categoryName, subcategoryName);
                    if (subcategory) {
                        const newSubcategories = category.subcategories.filter((subcategory) => subcategory.subcategoryName !== subcategoryName);
                        //check if a subcategory was deleted
                        if (newSubcategories.length == category.subcategories.length) {
                            //console.log("No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName);
                            return { "name": "No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName };
                        }
                        //console.log("La subcategoría " + subcategoryName + " se elmino de la categoría " + categoryName);
                        const result = yield collection.updateOne({ categoryName: categoryName }, { $set: { subcategories: newSubcategories } });
                        return { "name": "La subcategoría " + subcategoryName + " se eliminó de la categoría " + categoryName };
                    }
                    else {
                        //console.log("No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName);
                        return { "name": "No se encontró la subcategoría " + subcategoryName + " en la categoría " + categoryName };
                    }
                }
                else {
                    //console.log("No se encontró la categoría " + categoryName);
                    return { "name": "No se encontró la categoría " + categoryName };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se eliminó la subcategoría de la categoría" };
            }
        });
    }
    ;
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
    updateSubcategory(categoryName, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CATEGORY_COLLECTION);
                //Check if the category already exists
                const category = yield collection.findOne({ categoryName: categoryName });
                if (category) {
                    //Check if the subcategory already exists
                    const subcategory = yield this.getSubcategory(categoryName, object.subcategoryName);
                    if (subcategory) {
                        const newSubcategories = category.subcategories;
                        for (let i = 0; i < newSubcategories.length; i++) {
                            if (newSubcategories[i].subcategoryName == object.subcategoryName) {
                                newSubcategories[i].subcategoryName = object.subcategoryName;
                                break;
                            }
                        }
                        const result = yield collection.updateOne({ categoryName: categoryName }, { $set: { subcategories: newSubcategories } });
                        return { "name": "La subcategoría " + object.subcategoryName + " se actualizó en la categoría " + categoryName };
                    }
                    else {
                        //console.log("No se encontró la subcategoría " + object.subcategoryName + " en la categoría " + categoryName);
                        return { "name": "No se encontró la subcategoría " + object.subcategoryName + " en la categoría " + categoryName };
                    }
                }
                else {
                    //console.log("No se encontró la categoría " + categoryName);
                    return { "name": "No se encontró la categoría " + categoryName };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se actualizó la subcategoría de la categoría" };
            }
        });
    }
    ;
}
exports.DAOCategory = DAOCategory;
