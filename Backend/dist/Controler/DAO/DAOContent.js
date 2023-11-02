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
exports.DAOContent = void 0;
const Schemas_1 = require("./schemas/Schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const SingletonMongo_1 = require("../Singleton/SingletonMongo");
const config_1 = require("../config");
/*-----------------------------------------------------------------------
 DAO CONTENT
 Class for managing the connection to the database and the queries related
  to the content
 METHODS:
    - getAll()
    - getObject(contentId: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
class DAOContent {
    constructor() { }
    ;
    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the contents in the database
    PARAMS:
        - none
    RETURNS:
        - contents: array of contents
        - error message if the contents were not found
    */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CONTENT_COLLECTION);
                //Get the contents from the database, using the code
                let contents = yield collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (contents) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(contents, null, 2));
                    return contents;
                }
                else {
                    return { "name": "No se encontraron contenidos" };
                }
            }
            catch (error) {
                //console.log(error);
                return { "name": "No se encontraron contenidos" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a Content in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - Content if the Content was found
        - error message if the Content was not found
    */
    getObject(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CONTENT_COLLECTION);
                //Get the Content from the database, using the code
                const Content = yield collection.findOne({ contentId: contentId });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the content was found, return it, else return error message
                if (Content) {
                    //console.log("Se encontro: " + JSON.stringify(Content, null, 2));
                    return Content;
                }
                else {
                    //console.log("No se encontró el contenido con el código: " + contentId);
                    return { "name": "No se encontró el contenido" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el contenido" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a Content in the database
    PARAMS:
        - object: Content
    RETURNS:
        - ok message if the Content was created
        - error message if the Content was not created
    */
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("123");
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CONTENT_COLLECTION);
                const Content = mongoose_1.default.model('Content', Schemas_1.ContentSchema);
                //Create a new content with the object received
                let newContent = new Content({
                    contentId: " ",
                    title: object.title,
                    description: object.description,
                    date: object.date,
                    imageId: object.imageId,
                    categoryName: object.categoryName,
                    tags: object.tags
                });
                //Check if the content already exists
                const content = yield collection.findOne({ title: object.title });
                if (content) {
                    //console.log("El contenido " +  object.title + " ya existe");
                    //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                    return { "name": "El contenido " + object.title + " ya existe" };
                }
                //Insert the product in the database, convert it to JSON and parse it
                const newContentJson = JSON.stringify(newContent);
                const newContentparsed = JSON.parse(newContentJson);
                yield collection.insertOne(newContentparsed);
                //update id with the auto-generated id
                const doc = yield collection.findOne({ title: object.title });
                if (!doc) {
                    //console.log("El content " +  object.title + " no existe");
                    return { "name": "El contenido " + object.title + " no existe" };
                }
                //update the contentId with the stringObjectId
                const result = yield collection.updateOne({ title: newContent.title }, { $set: { contentId: doc._id } });
                //validate if the content was updated
                if (result.modifiedCount > 0) {
                    //console.log("Content actualizado con éxito");
                    return { "name": "Contenido actualizado con éxito" };
                }
                else {
                    //console.log("No se encontró el content para actualizar");
                    return { "name": "No se encontró el contenido para actualizar" };
                }
            }
            catch (err) {
                return { "name": "No se encontró el contenido" };
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
        - error message if the product was not updated
    */
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Mongo connection with singleton
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CONTENT_COLLECTION);
                //Get the model from the database with the schema
                const Content = mongoose_1.default.model('Content', Schemas_1.ContentSchema);
                //Create a new product with the object received
                let updatedContent = new Content({
                    _id: object._id,
                    title: object.title,
                    description: object.description,
                    date: object.date,
                    imageId: object.imageId,
                    categoryName: object.categoryName,
                    tags: object.tags
                });
                //Verify existence of the content
                const content = yield collection.findOne({ contentId: object._id });
                if (!content) {
                    //console.log("El content " +  object._id + " no existe");
                    return { "name": "El contenido no existe" };
                }
                //Verify that the title is not already taken
                const contentRepeated = yield collection.find({ title: object.title });
                for (let doc = yield contentRepeated.next(); doc != null; doc = yield contentRepeated.next()) {
                    if (doc._id != object._id) {
                        //console.log("El content " +  object.title + " ya existe");
                        return { "name": "El contenido" + object.title + " ya existe" };
                    }
                }
                //Create the update object for updating the content
                const InfoToUpdate = {
                    $set: {
                        _id: object._id,
                        title: object.title,
                        description: object.description,
                        date: object.date,
                        imageId: object.imageId,
                        categoryName: object.categoryName,
                        tags: object.tags
                    }
                };
                const result = yield collection.updateOne({ contentId: object._id }, InfoToUpdate); //Update the product in the database
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    //console.log("Contenido actualizado con éxito " + JSON.stringify(object, null, 2));
                    return { "name": "Contenido actualizado con éxito" };
                }
                else {
                    //console.log("No se encontró el contenido para actualizar o no se actualizó ningun campo");
                    return { "name": "No se encontró el contenido para actualizar o no se actualizó ningun campo" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el contenido" };
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
    delete(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("code: " + contentId);
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CONTENT_COLLECTION);
                //Verify existence of the content
                const content = yield collection.findOne({ contentId: contentId });
                if (!content) {
                    //console.log("El content " +  contentId + " no existe");
                    return { "name": "El contenido no existe" };
                }
                //Delete the content in the database
                const result = yield collection.deleteOne({ contentId: contentId });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the content was deleted
                if (result.deletedCount > 0) {
                    //console.log("Content eliminado con éxito");
                    return { "name": "Contenido eliminado con éxito" };
                }
                else {
                    //console.log("No se encontró el content para eliminar");
                    return { "name": "No se pudo eliminar contenido" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se puso eliminar el contenido" };
            }
        });
    }
    ;
    getAllWithFilters(categoryNames, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CONTENT_COLLECTION);
                //Get the contents from the database, using the code
                let contents = yield collection.find({}).toArray();
                //----------------------------------------------------------------------------
                let filterCategory = [];
                if (categoryNames.length > 0) {
                    for (let i = 0; i < categoryNames.length; i++) {
                        filterCategory.push(contents.filter((content) => content.categoryName == categoryNames[i]));
                    }
                    //console.log("filterCategory: " + JSON.stringify(filterCategory));
                }
                //----------------------------------------------------------------------------
                let filterTags = [];
                if (tags.length > 0) {
                    for (let i = 0; i < tags.length; i++) {
                        filterTags.push(contents.filter((content) => content.tags.includes(tags[i])));
                    }
                    //console.log("filterTags: " + JSON.stringify(filterTags));
                }
                if (tags.length == 0 && categoryNames.length == 0) {
                    let allContents = this.getAll();
                    return allContents;
                }
                if (filterCategory.length == 0) {
                    console.log("filterTags: " + JSON.stringify(filterTags));
                    return filterTags[0];
                }
                else if (filterTags.length == 0) {
                    //console.log("filterTags: " + JSON.stringify(filterCategory, null, 2));
                    return filterCategory[0];
                }
                else {
                    let resultado = filterCategory.concat(filterTags);
                    let resultadoDef = [];
                    // for (let i = 0; i < resultado.length; i++) {
                    //     if(!resultadoDef.includes(resultado[i][0])){ //para que no se repitan
                    //         resultadoDef.push(resultado[i][0]);
                    //     }
                    // }
                    console.log("resultado: " + JSON.stringify(resultado, null, 2));
                    //include the elements that are in both arrays
                    for (let i = 0; i < filterTags[0].length; i++) {
                        for (let j = 0; j < filterCategory[0].length; j++) {
                            if (filterTags[0][i] == filterCategory[0][j]) { // hacer un AND entre los dos filtros
                                if (resultadoDef.includes(resultado[0][i])) { //para que no se repitan
                                    break;
                                }
                                resultadoDef.push(filterTags[0][i]);
                            }
                        }
                    }
                    console.log("resultadoDef: " + JSON.stringify(resultadoDef, null, 2));
                    return resultadoDef;
                }
            }
            catch (error) {
                //console.log(error);
                return { "name": "No se encontraron contenidos" };
            }
        });
    }
}
exports.DAOContent = DAOContent;
;
