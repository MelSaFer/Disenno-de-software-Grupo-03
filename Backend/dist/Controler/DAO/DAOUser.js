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
exports.DAOUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schemas_1 = require("./schemas/Schemas");
const SingletonMongo_1 = require("../Singleton/SingletonMongo");
const config_1 = require("../config");
const DAOProduct_1 = require("./DAOProduct");
/*-----------------------------------------------------------------------
DAO USER
 Class for managing the connection to the database and the queries related
 to the user
 METHODS:
    - getAll()
    - getObject(userId: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
    - updateCart(userId: any, productId: number, quantity_: number)
    - getCart(userId: unknown)
    - getPurchaseHistory(userId: unknown)
    - getCart(userId: unknown)
    - getPurchaseHistory(userId: unknown)
-----------------------------------------------------------------------*/
class DAOUser {
    constructor() { }
    ;
    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the users in the database
    PARAMS:
        - none
    RETURNS:
        - users: array of users
        - error: string, error message if exists
    */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.USER_COLLECTION);
                //Get the users from the database, using the code
                let users = yield collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (users) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(users, null, 2));
                    return users;
                }
                else {
                    //console.log("No se encontraron carritos");
                    return { "name": "No se encontraron carritos" };
                }
            }
            catch (error) {
                //console.log(error);
                return { "name": "No se encontraron carritos" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a user in the database
    PARAMS:
        - userId: number, the id of the user to get
    RETURNS:
        - user: user object
        - error: string, error message if exists
    */
    getObject(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.USER_COLLECTION);
                //Get the cart from the database, using the code
                const user = yield collection.findOne({ userId: userId });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the user was found, return it, else return error
                if (user) {
                    //console.log("Se encontró: " + JSON.stringify(user, null, 2));
                    //Insert the user in the database, convert it to JSON and parse it
                    const newUserJson = JSON.stringify(user);
                    const newUserparsed = JSON.parse(newUserJson);
                    return newUserparsed;
                }
                else {
                    //console.log("No se encontró el user con el código: " + userId);
                    return { "name": "No se encontró el usuario" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró el usuario" };
            }
        });
    }
    ;
    /*
-----------------------------------------------------------------------
GET CART METHOD
Gets the cart of a user
PARAMS:
    - userId: number, the id of the user to get the cart
RETURNS:
    - cart: array of products in the cart if the user was found
    - error message if the user was not found
*/
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.USER_COLLECTION);
                //Get the cart from the database, using the code
                const user = yield collection.findOne({ userId: userId });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the user was found, return it, else return error
                if (user) {
                    console.log("Se encontró: " + JSON.stringify(user, null, 2));
                    let newCart = [];
                    for (let i = 0; i < user.cart.length; i++) {
                        let productId = user.cart[i]["productId"];
                        let quantity = user.cart[i]["quantity"];
                        let daoProduct = new DAOProduct_1.DAOProduct();
                        let product = yield daoProduct.getObject(productId);
                        if (product) {
                            let doc = { "name": product.name, "quantity": quantity };
                            newCart.push(doc);
                        }
                        else {
                            console.log("No se encontró el producto con el código: " + productId);
                            return { "name": "No se encontró el producto" };
                        }
                    }
                    return newCart;
                }
                else {
                    //console.log("No se encontró el user con el código: " + userId);
                    return { "name": "No se encontró el usuario" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "Error al obtener el carrito" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    GET PURCHASE HISTORY METHOD
    Gets the purchase history of a user
    PARAMS:
        - userId: number, the id of the user to get the purchase history
    RETURNS:
        - purchaseHistory: array of products
    */
    getPurchaseHistory(userId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const user_collection = db.collection(config_1.USER_COLLECTION);
                const purchasehistory_collection = db.collection(config_1.PURCHASE_COLLECTION);
                //Get the user from the database, using the code
                const user = yield user_collection.findOne({ userId: userId });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the user was found, return it, else return error
                if (user) {
                    //console.log("Se encontró: " + JSON.stringify(user, null, 2));
                    //If the roletype is admin get all the purchase history
                    let purchaseHistory = [];
                    let cursor;
                    if (user.roleType == "ADMINISTRATOR") {
                        cursor = yield purchasehistory_collection.find();
                    }
                    else {
                        cursor = yield purchasehistory_collection.find({ userId: userId });
                    }
                    for (let doc = yield cursor.next(); doc != null; doc = yield cursor.next()) {
                        purchaseHistory.push(doc);
                    }
                    //If the purchase history was found, return it, else return error
                    if (purchaseHistory) {
                        //Change productId for productName
                        for (let i = 0; i < purchaseHistory.length; i++) {
                            //Verify purchaseHistory[i] is not null
                            if (purchaseHistory[i]) {
                                let products = (_a = purchaseHistory[i]) === null || _a === void 0 ? void 0 : _a.products;
                                let newProducts = [];
                                for (let j = 0; j < products.length; j++) {
                                    let productId = products[j].productId;
                                    let quantity = products[j].quantity;
                                    let daoProduct = new DAOProduct_1.DAOProduct();
                                    let product = yield daoProduct.getObject(productId);
                                    if (product) {
                                        let doc = { "productName": product.name, "quantity": quantity };
                                        newProducts.push(doc);
                                    }
                                    else {
                                        //console.log("No se encontró el producto con el código: " + productId);
                                        return { "name": "No se encontró el producto en el historial de compras" };
                                    }
                                }
                                if ((_b = purchaseHistory[i]) === null || _b === void 0 ? void 0 : _b.products) {
                                    purchaseHistory[i].products = newProducts;
                                }
                            }
                            else {
                                //console.log("No se encontraron productos en el historial de compras del usuario con el código: " + userId);
                                return { "name": "No se encontraron productos en el historial de compras del usuario" };
                            }
                        }
                        return purchaseHistory;
                    }
                    else {
                        //console.log("No se encontró el historial de compras del usuario con el código: " + userId);
                        return { "name": "No se encontró el historial del usuario" };
                    }
                }
                else {
                    //console.log("No se encontró el user con el código: " + userId);
                    return { "name": "No se encontró el usuario" };
                }
            }
            catch (err) {
                console.log(err);
                return { "name": "Error al obtener el historial de compras" };
            }
        });
    }
    ;
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.USER_COLLECTION);
                const User = mongoose_1.default.model('User', Schemas_1.UserSchema);
                let newUser = new User({
                    userId: object.userId,
                    email: object.email,
                    roleType: object.roleType,
                    cart: object.cart
                });
                const newUserJson = JSON.stringify(newUser);
                const newUserparsed = JSON.parse(newUserJson);
                yield collection.insertOne(newUserparsed);
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                return { "name": "Se creó el usuario con éxito" };
            }
            catch (err) {
                console.log(err);
                return { "name": "No se pudo crear el usuario" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    update(object: unknown)
    Update a user in the database
    PARAMS:
        - object: User
    RETURNS:
        - ok message if the user has been updated
        - error message if the user has not been updated
    -----------------------------------------------------------------------
    */
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.USER_COLLECTION);
                //Get the model from the database with the schema
                const Cart = mongoose_1.default.model('User', Schemas_1.UserSchema);
                //Create a new product with the object received
                let updatedUser = new Cart({
                    userId: object.userId,
                    roleType: object.roleType,
                    cart: object.cart
                });
                //Create the update object for updating the content
                const InfoToUpdate = {
                    $set: {
                        userId: object.userId,
                        roleType: object.roleType,
                        cart: object.cart
                    }
                };
                //Create list of items to update
                const newItemsList = [];
                //...?
                const result = yield collection.updateOne({ userId: updatedUser.userId }, InfoToUpdate); //Update the product in the database
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    //console.log("Usuario actualizado con éxito " + JSON.stringify(updatedUser, null, 2));
                    return { "name": "El usuario se actualizó con éxito" };
                }
                else {
                    //console.log("No se encontró el Usuario para actualizar o no se actualizó ningun campo");
                    return { "name": "No se encontró el usuario para actualizar o no se actualizó ningun campo" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se pudo actualizar el usuario" };
            } //end try-catch
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    delete(object: unknown)
    Delete a user in the database
    PARAMS:
        - object: User
    RETURNS:
        - ok message if the user has been deleted
        - error if the user has not been deleted
    */
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.USER_COLLECTION);
                //Verify existence of the user
                const user = yield collection.findOne({ userId: userId });
                if (!user) {
                    console.log("El user " + userId + " no existe");
                    return { "name": "El usuario no existe" };
                }
                //Delete the user in the database
                const result = yield collection.deleteOne({ userId: userId });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the user was deleted
                if (result.deletedCount > 0) {
                    console.log("User eliminado con éxito");
                    return { "name": "El usuario se eliminó con éxito" };
                }
                else {
                    //console.log("No se encontró el user para eliminar");
                    return { "name": "No se encontró el usuario para eliminar" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se pudo eliminar el usuario" };
            }
            //return ok message;
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    UPDATE CART METHOD
    ADDS CART ITEM OR INCREASES THE AMOUNT OF AN ITEM
    PARAMS:
        - user: user object, the user that is adding the item to the cart
        - productId: string, the id of the product to add
        - quantity: number, the amount of the product to add
    RETURNS:
        - ok message if the product was added to the cart
        - error if the product was not added to the cart
    */
    updateCart(userId, productId, quantity_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const product_collection = db.collection(config_1.PRODUCT_COLLECTION);
                const user_collection = db.collection(config_1.USER_COLLECTION);
                const Product = mongoose_1.default.model('Product', Schemas_1.ProductSchema);
                const User = mongoose_1.default.model('User', Schemas_1.UserSchema);
                const user = yield user_collection.findOne({ userId: userId });
                if (!user) {
                    //console.log("El usuario " +  userId + " no existe");
                    return { "name": "El usuario no existe" };
                }
                //Verify existence of the product
                const product = yield product_collection.findOne({ productId: productId });
                if (!product) {
                    //console.log("El producto " +  productId + " no existe");
                    return { "name": "El producto no existe" };
                }
                //Verify availability of the product
                if (product.quantity < quantity_) {
                    //console.log("No hay suficientes productos disponibles");
                    return { "name": "No hay suficientes productos disponibles" };
                }
                //Get cart from user
                const cart = user.cart;
                //Check if the product is already in the cart and update it
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].productId == productId) {
                        //console.log(user);
                        //Verify that the quantity is not less than 0
                        if (cart[i].quantity + quantity_ <= 0) {
                            cart.splice(i, 1);
                            //console.log(user);
                        }
                        else {
                            cart[i].quantity += quantity_;
                        }
                        const result = yield user_collection.updateOne({ userId: user.userId }, { $set: { cart: cart } });
                        return { "name": "Se actualizó el carrito" };
                    }
                }
                //If not in the cart, add it
                cart.push({
                    productId: productId,
                    quantity: 1
                });
                //console.log("se agrego el producto al carrito");
                //Update cart in the database
                const result = yield user_collection.updateOne({ userId: user.userId }, { $set: { cart: cart } });
                //console.log("se actualizo el carrito");
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return { "name": "Se actualizó el carrito" };
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se pudo actualizar el carrito" };
            }
            //return ok message;
        });
    }
    ;
}
exports.DAOUser = DAOUser;
