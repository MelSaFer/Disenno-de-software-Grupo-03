import {DAO} from "./DAO"
import mongoose from "mongoose";
import {UserSchema, ProductSchema} from "./schemas/Schemas"
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, USER_COLLECTION, PRODUCT_COLLECTION, PURCHASE_COLLECTION} from "../config";
import { DAOProduct } from "./DAOProduct";

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
-----------------------------------------------------------------------*/
export class DAOUser implements DAO{

    constructor(){};

    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the users in the database
    PARAMS:
        - none
    RETURNS:
        - users: array of users
    */
        async getAll(){
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(USER_COLLECTION);
            
                //Get the users from the database, using the code
                let users = await collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
    
                if (users) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(users, null, 2));
                    return users;
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


        async getObject(userId: unknown){
            try{
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(USER_COLLECTION);
               
                //Get the cart from the database, using the code
                const user = await collection.findOne({ userId: userId });
                SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                // If the user was found, return it, else return false
                if (user) {
                    
                    console.log("Se encontró: " + JSON.stringify(user, null, 2));
                    //Insert the user in the database, convert it to JSON and parse it
                    const newUserJson = JSON.stringify(user);
                    const newUserparsed = JSON.parse(newUserJson);
                    return newUserparsed;
                } else {
                    console.log("No se encontró el user con el código: " + userId);
                    return false; 
                }
            } catch(err){
                console.log(err);
                return false;
            }
        };

        /*
    -----------------------------------------------------------------------
    GET CART METHOD
    Gets the cart of a user
    PARAMS:
        - userId: number, the id of the user to get the cart
    RETURNS:
        - cart: array of products
    */
    async getCart(userId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);
            
            //Get the cart from the database, using the code
            const user = await collection.findOne({ userId: userId });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the user was found, return it, else return false
            if (user) {
                
                console.log("Se encontró: " + JSON.stringify(user, null, 2));

                let newCart = [];
                for (let i = 0; i < user.cart.length; i++) {
                    let productId = user.cart[i]["productId"];
                    let quantity = user.cart[i]["quantity"];

                    let daoProduct = new DAOProduct();
                    let product = await daoProduct.getObject(productId);

                    if(product){
                        let doc = {"productDescription": product.description, "quantity": quantity};
                        newCart.push(doc);
                    }
                    else{
                        console.log("No se encontró el producto con el código: " + productId);
                        return false;
                    }
                }

                return newCart;

            } else {
                console.log("No se encontró el user con el código: " + userId);
                return false; 
            }
        } catch(err){
            console.log(err);
            return false;
        }
    };

    /*
    -----------------------------------------------------------------------
    GET PURCHASE HISTORY METHOD
    Gets the purchase history of a user
    PARAMS:
        - userId: number, the id of the user to get the purchase history
    RETURNS:
        - purchaseHistory: array of products
    */
    async getPurchaseHistory(userId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const user_collection = db.collection(USER_COLLECTION);
            const purchasehistory_collection = db.collection(PURCHASE_COLLECTION);
            
            //Get the cart from the database, using the code
            const user = await user_collection.findOne({ userId: userId });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database

            // If the user was found, return it, else return false
            if (user) {
                //console.log("Se encontró: " + JSON.stringify(user, null, 2));

                //If the roletype is admin get all the purchase history
                let purchaseHistory = [];
                if (user.roleType == "ADMINISTRATOR"){
                    const cursor = await purchasehistory_collection.find();
                    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                        purchaseHistory.push(doc);
                    }

                }
                else{
                    const cursor = await purchasehistory_collection.find({ userId: userId });
                    purchaseHistory.push(await cursor.next());
                }                

                //If the purchase history was found, return it, else return false
                if (purchaseHistory){
                    return purchaseHistory;
                } else {
                    console.log("No se encontró el historial de compras del usuario con el código: " + userId);
                    return false; 
                }

            } else {
                console.log("No se encontró el user con el código: " + userId);
                return false; 
            }
        } catch(err){
            console.log(err);
            return false;
        }
    };

    async create(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);
            const User = mongoose.model('User', UserSchema);

            let newUser = new User({
                userId: object.userId,
                roleType: object.roleType,
                cart: object.cart
            });

            const user = await collection.findOne({ userId: object.userId });
            if (user){
                console.log("El usuario " +  object.userId + " ya existe");
                return false;
            }
            
            const newUserJson = JSON.stringify(newUser);
            const newUserparsed = JSON.parse(newUserJson);
            await collection.insertOne(newUserparsed);
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    };

    /*
    -----------------------------------------------------------------------
    update(object: unknown)
    Update a user in the database
    PARAMS:
        - object: User
    RETURNS:
        - true if the user has been updated
        - false if the user has not been updated
    -----------------------------------------------------------------------
    */
    async update(object: any){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);  
            const collection = db.collection(USER_COLLECTION);
            //Get the model from the database with the schema
            const Cart = mongoose.model('User', UserSchema);
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
    
            const result = await collection.updateOne({ userId: updatedUser.userId }, InfoToUpdate); //Update the product in the database
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the product was updated  
            if (result.modifiedCount > 0) {
                console.log("Usuario actualizado con éxito " + JSON.stringify(updatedUser, null, 2));
                return true;
            } else {
                console.log("No se encontró el Usuario para actualizar o no se actualizó ningun campo");
                return false;
            }
        } catch(err){
            console.log(err);
        } //end try-catch
        return true;
    };


    /*
    -----------------------------------------------------------------------
    delete(object: unknown)
    Delete a user in the database
    PARAMS:
        - object: User
    RETURNS:
        - true if the user has been deleted
        - false if the user has not been deleted
    */
    async delete(userId: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);

            //Verify existence of the user
            const user = await collection.findOne({ userId: userId });
            if (!user){
                console.log("El user " +  userId + " no existe");
                return false;
            }
            //Delete the user in the database
            const result = await collection.deleteOne({ userId: userId });
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the user was deleted
            if (result.deletedCount > 0) {
                console.log("User eliminado con éxito");
                return true;
            } else {
                console.log("No se encontró el user para eliminar");
                return false;
            }

        } catch(err){
            console.log(err);
        }
        return true;
    };

    /*
    -----------------------------------------------------------------------
    UPDATE CART METHOD
    ADDS CART ITEM OR INCREASES THE AMOUNT OF AN ITEM 
    PARAMS:
        - user: user object, the user that is adding the item to the cart
        - productId: string, the id of the product to add
        - quantity: number, the amount of the product to add
    RETURNS:    
        - true if the product was added to the cart
        - false if the product was not added to the cart
    */
        async updateCart(userId: any, productId: number, quantity_: number){
            try{
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const product_collection = db.collection(PRODUCT_COLLECTION);
                const user_collection = db.collection(USER_COLLECTION);

                const Product = mongoose.model('Product', ProductSchema);
                const User = mongoose.model('User', UserSchema);

                const user = await user_collection.findOne({ userId: userId });
                if (!user){
                    console.log("El usuario " +  userId + " no existe");
                    return false;
                }
    
                //Verify existence of the product
                const product = await product_collection.findOne({ productId: productId });
                if (!product){
                    console.log("El producto " +  productId + " no existe");
                    return false;
                }

                //Verify availability of the product
                if (product.quantity < quantity_){
                    console.log("No hay suficientes productos disponibles");
                    return false;
                }
    
                //Get cart from user
                const cart = user.cart;
    
                //Check if the product is already in the cart and update it
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].productId == productId){

                        console.log(user);

                        //Verify that the quantity is not less than 0
                        if (cart[i].quantity + quantity_ <= 0){
                            cart.splice(i, 1);
                            console.log(user);
                        }
                        else{
                            cart[i].quantity += quantity_;
                        }
                        const result = await user_collection.updateOne({ userId: user.userId }, { $set: { cart: cart } });
                        return true;
                    }
                }
    
                //If not in the cart, add it
                cart.push({
                    productId: productId,
                    quantity: 1
                });
    
                console.log("se agrego el producto al carrito");
    
                //Update cart in the database
                const result = await user_collection.updateOne({ userId: user.userId }, { $set: { cart: cart } });
                console.log("se actualizo el carrito");
    
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return true
    
            } catch(err){
                console.log(err);
            }
            return true;
        };
}
