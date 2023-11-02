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
exports.DAOProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schemas_1 = require("./schemas/Schemas");
const SingletonMongo_1 = require("../Singleton/SingletonMongo");
const config_1 = require("../config");
/*-----------------------------------------------------------------------
 DAO PRODUCT
 Class for managing the connection to the database and the queries related
 to the Product

PRODUCT ATTRIBUTES:
    - productId: string
    - description: string
    - cuantityAvailable: number
    - imageId: string
    - price: number

 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
class DAOProduct {
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
    */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                //Get the contents from the database, using the code
                let product = yield collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (product) {
                    return product;
                }
                else {
                    return { "name": "No se encontraron productos" };
                }
            }
            catch (error) {
                //console.log(error);
                return { "name": "No se encontraron productos" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a product in the database
    PARAMS:
        - code: String | Undefined
    RETURNS:
        - Product if the product was found
        - error message if the product was not found
    */
    getObject(idProduct_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                //Get the product from the database, using the code
                const product = yield collection.findOne({ productId: idProduct_ });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the product was found, return it, else return error message
                if (product) {
                    //console.log("Se encontro: " + JSON.stringify(product, null, 2));
                    return product;
                }
                else {
                    //console.log("No se encontró el producto con el código: " + idProduct_);
                    return { "name": "No se encontró el producto" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el producto" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    GET NAME METHOD
    Gets a product name in the database
    PARAMS:
        - code: number
    RETURNS:
        - Product if the product was found
        - error message if the product was not found
    */
    getProductName(idProduct_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                //Get the product from the database, using the code
                const product = yield collection.findOne({ productId: idProduct_ });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the product was found, return it, else return error message
                if (product) {
                    console.log("Se encontro: " + JSON.stringify(product, null, 2));
                    return product.description;
                }
                else {
                    //console.log("No se encontró el producto con el código: " + idProduct_);
                    return { "name": "No se encontró el producto" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el producto" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - ok message if the product was created
        - error message if the product was not created
    */
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                const Product = mongoose_1.default.model('Product', Schemas_1.ProductSchema);
                //Create a new product with the object received
                let newProduct = new Product({
                    productId: "",
                    name: object.name,
                    description: object.description,
                    cuantityAvailable: object.cuantityAvailable,
                    imageId: object.imageId,
                    price: object.price
                });
                //Check if the product already exists
                const product = yield collection.findOne({ name: newProduct.name });
                if (product) {
                    //console.log("El producto " +  object.name + " ya existe");
                    SingletonMongo_1.SingletonMongo.getInstance().disconnect_();
                    return { "name": "Ya existe un producto con ese nombre" };
                }
                //Insert the product in the database, convert it to JSON and parse it
                const newProductJson = JSON.stringify(newProduct);
                const newProductparsed = JSON.parse(newProductJson);
                yield collection.insertOne(newProductparsed);
                const theProduct = yield collection.findOne({ name: newProduct.name });
                if (!theProduct) {
                    //console.log("ERROR AL INSERTAR EL PRODUCTO");
                    SingletonMongo_1.SingletonMongo.getInstance().disconnect_();
                    return { "name": "Error al insertar el producto" };
                }
                //update the contentId with the stringObjectId
                const result = yield collection.updateOne({ name: object.name }, { $set: { productId: theProduct._id } });
                //console.log("Se inserto: " + newProductJson);
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                return { "name": "Se insertó el producto con éxito" };
            }
            catch (err) {
                //console.log(err);
                return { "name": "Error al insertar el producto" };
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
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                //Get the model from the database with the schema
                const Product = mongoose_1.default.model('Product', Schemas_1.ProductSchema);
                //Create a new product with the object received
                let updatedProduct = new Product({
                    productId: object.productId,
                    name: object.name,
                    description: object.description,
                    cuantityAvailable: object.cuantityAvailable,
                    imageId: object.imageId,
                    price: object.price
                });
                //Check if the product exists
                const product_ = yield collection.findOne({ productId: object.productId });
                if (!product_) {
                    //console.log("El producto " +  JSON.stringify(object.productId) + " no existe");
                    return { "name": "El producto no existe" };
                }
                //Verify that the name is not already taken
                const contentRepeated = yield collection.find({ name: object.name });
                for (let doc = yield contentRepeated.next(); doc != null; doc = yield contentRepeated.next()) {
                    if (doc.productId != object.productId) {
                        console.log("El producto " + JSON.stringify(object.title) + " ya existe");
                        return { "name": "Ya existe un producto con ese nombre" };
                    }
                }
                //Create the update object for updating the product
                const InfoToUpdate = {
                    $set: {
                        description: updatedProduct.description,
                        name: updatedProduct.name,
                        cuantityAvailable: updatedProduct.cuantityAvailable,
                        imageId: updatedProduct.imageId,
                        price: updatedProduct.price
                    }
                };
                const result = yield collection.updateOne({ productId: object.productId }, InfoToUpdate); //Update the product in the database
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    //console.log("Producto actualizado con éxito " + JSON.stringify(updatedProduct, null, 2));
                    return { "name": "Producto actualizado con éxito" };
                }
                else {
                    //console.log("No se encontró el producto para actualizar o no se actualizó ningun campo");
                    return { "name": "No se encontró el producto a actualizar o no se actualizó ningun campo" };
                }
            }
            catch (err) {
                console.log(err);
                return { "name": "No se encontró el producto" };
            } //end try-catch
            //return ok message;
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
    delete(productId_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Mongo connection with singleton
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                //Verify existence of the product
                const product = yield collection.findOne({ productId: productId_ });
                if (!product) {
                    //console.log("El producto " +  productId_ + " no existe");
                    return { "name": "El producto no existe" };
                }
                //Delete the product in the database
                const result = yield collection.deleteOne({ productId: productId_ });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the product was deleted
                if (result.deletedCount > 0) {
                    //console.log("Product eliminado con éxito");
                    return { "name": "Producto eliminado con éxito" };
                }
                else {
                    //console.log("No se encontró el product para eliminar");
                    return { "name": "No se encontró el producto" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el producto" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a product in the database
    PARAMS:
        - name: String | Undefined
    RETURNS:
        - Product if the product was found
        - error message if the product was not found
    */
    getObjectByName(name_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PRODUCT_COLLECTION);
                //Get the product from the database, using the code
                const product = yield collection.findOne({ name: name_ });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the product was found, return it, else return error message
                if (product) {
                    //console.log("Se encontro: " + JSON.stringify(product, null, 2));
                    return product;
                }
                else {
                    //console.log("No se encontró el producto con el código: " + idProduct_);
                    return { "name": "No se encontró el producto" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el producto" };
            }
        });
    }
    ;
}
exports.DAOProduct = DAOProduct;
