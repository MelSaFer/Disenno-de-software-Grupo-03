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
    - updateCart(userId: any, productId: number, quantity_: number)
    - getCart(userId: unknown)
    - getPurchaseHistory(userId: unknown)
    - getCart(userId: unknown)
    - getPurchaseHistory(userId: unknown)
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
        - error: string, error message if exists
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
                    //console.log("No se encontraron carritos");
                    return {"name": "No se encontraron carritos"};
                }
                
                
    
            } catch (error) {
                //console.log(error);
                return {"name": "No se encontraron carritos"};
            }
            
    
        };

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
        async getObject(userId: unknown){
            try{
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(USER_COLLECTION);
               
                //Get the cart from the database, using the code
                const user = await collection.findOne({ userId: userId });
                SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                // If the user was found, return it, else return error
                if (user) {
                    //console.log("Se encontró: " + JSON.stringify(user, null, 2));
                    //Insert the user in the database, convert it to JSON and parse it
                    const newUserJson = JSON.stringify(user);
                    const newUserparsed = JSON.parse(newUserJson);
                    return newUserparsed;
                } else {
                    //console.log("No se encontró el user con el código: " + userId);
                    return {"name": "No se encontró el usuario"};
                }
            } catch(err){
                //console.log(err);
                return {"name": "No se encontró el usuario"};
            }
        };

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
    async getCart(userId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);
            
            //Get the cart from the database, using the code
            const user = await collection.findOne({ userId: userId });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the user was found, return it, else return error
            if (user) {
                
                console.log("Se encontró: " + JSON.stringify(user, null, 2));

                let newCart = [];
                for (let i = 0; i < user.cart.length; i++) {
                    let productId = user.cart[i]["productId"];
                    let quantity = user.cart[i]["quantity"];

                    let daoProduct = new DAOProduct();
                    let product = await daoProduct.getObject(productId);

                    if(product){
                        let doc = {"name": product.name, "quantity": quantity};
                        newCart.push(doc);
                    }
                    else{
                        console.log("No se encontró el producto con el código: " + productId);
                        return {"name": "No se encontró el producto"};
                    }
                }
                return newCart;

            } else {
                //console.log("No se encontró el user con el código: " + userId);
                return {"name": "No se encontró el usuario"}; 
            }
        } catch(err){
            //console.log(err);
            return {"name": "Error al obtener el carrito"};
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
            
            //Get the user from the database, using the code
            const user = await user_collection.findOne({ userId: userId });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database

            // If the user was found, return it, else return error
            if (user) {
                //console.log("Se encontró: " + JSON.stringify(user, null, 2));
                //If the roletype is admin get all the purchase history
                let purchaseHistory = [];
                let cursor;
                if (user.roleType == "ADMINISTRATOR"){
                    cursor = await purchasehistory_collection.find();
                }
                else{
                    cursor = await purchasehistory_collection.find({ userId: userId });
                }             
                
                for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                    purchaseHistory.push(doc);
                }

                //If the purchase history was found, return it, else return error
                if (purchaseHistory){

                    //Change productId for productName
                    for (let i = 0; i < purchaseHistory.length; i++) {
                        //Verify purchaseHistory[i] is not null
                        if(purchaseHistory[i]){
                            let products = purchaseHistory[i]?.products;
                            let newProducts = [];

                            for (let j = 0; j < products.length; j++) {
                                let productId = products[j].productId;
                                let quantity = products[j].quantity;

                                let daoProduct = new DAOProduct();
                                let product = await daoProduct.getObject(productId);

                                if(product){
                                    let doc = {"productName": product.name, "quantity": quantity};
                                    newProducts.push(doc);
                                }
                                else{
                                    //console.log("No se encontró el producto con el código: " + productId);
                                    return {"name": "No se encontró el producto en el historial de compras"};
                                }
                            }
                            
                            if (purchaseHistory[i]?.products) {
                                purchaseHistory[i]!.products = newProducts;
                            }



                        }
                        else{
                            //console.log("No se encontraron productos en el historial de compras del usuario con el código: " + userId);
                            return {"name": "No se encontraron productos en el historial de compras del usuario"};
                        }
                        
                    }

                    return purchaseHistory;
                } else {
                    //console.log("No se encontró el historial de compras del usuario con el código: " + userId);
                    return {"name": "No se encontró el historial del usuario"}; 
                }

            } else {
                //console.log("No se encontró el user con el código: " + userId);
                return {"name": "No se encontró el usuario"}; 
            }
        } catch(err){
            console.log(err);
            return {"name": "Error al obtener el historial de compras"};
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
                email: object.email,
                roleType: object.roleType,
                cart: object.cart
            });
            
            const newUserJson = JSON.stringify(newUser);
            const newUserparsed = JSON.parse(newUserJson);
            await collection.insertOne(newUserparsed);
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return {"name": "Se creó el usuario con éxito"};
        } catch(err){
            console.log(err);
            return {"name": "No se pudo crear el usuario"}
        }
    };

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
                //console.log("Usuario actualizado con éxito " + JSON.stringify(updatedUser, null, 2));
                return {"name": "El usuario se actualizó con éxito"};
            } else {
                //console.log("No se encontró el Usuario para actualizar o no se actualizó ningun campo");
                return {"name": "No se encontró el usuario para actualizar o no se actualizó ningun campo"};
            }
        } catch(err){
            //console.log(err);
            return {"name": "No se pudo actualizar el usuario"};
        } //end try-catch
    };


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
    async delete(userId: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);

            //Verify existence of the user
            const user = await collection.findOne({ userId: userId });
            if (!user){
                console.log("El user " +  userId + " no existe");
                return {"name": "El usuario no existe"};
            }
            //Delete the user in the database
            const result = await collection.deleteOne({ userId: userId });
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the user was deleted
            if (result.deletedCount > 0) {
                console.log("User eliminado con éxito");
                return {"name" : "El usuario se eliminó con éxito"};
            } else {
                //console.log("No se encontró el user para eliminar");
                return {"name" : "No se encontró el usuario para eliminar"};
            }

        } catch(err){
            //console.log(err);
            return {"name" : "No se pudo eliminar el usuario"};
        }
        //return ok message;
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
        - ok message if the product was added to the cart
        - error if the product was not added to the cart
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
                    //console.log("El usuario " +  userId + " no existe");
                    return {"name": "El usuario no existe"};
                }
    
                //Verify existence of the product
                const product = await product_collection.findOne({ productId: productId });
                if (!product){
                    //console.log("El producto " +  productId + " no existe");
                    return {"name": "El producto no existe"};
                }

                //Verify availability of the product
                if (product.quantity < quantity_){
                    //console.log("No hay suficientes productos disponibles");
                    return {"name": "No hay suficientes productos disponibles"};
                }
    
                //Get cart from user
                const cart = user.cart;
    
                //Check if the product is already in the cart and update it
                for (let i = 0; i < cart.length; i++) {
                    if (cart[i].productId == productId){
                        //console.log(user);
                        //Verify that the quantity is not less than 0
                        if (cart[i].quantity + quantity_ <= 0){
                            cart.splice(i, 1);
                            //console.log(user);
                        }
                        else{
                            cart[i].quantity += quantity_;
                        }
                        const result = await user_collection.updateOne({ userId: user.userId }, { $set: { cart: cart } });
                        return {"name": "Se actualizó el carrito"};
                    }
                }
    
                //If not in the cart, add it
                cart.push({
                    productId: productId,
                    quantity: 1
                });
                //console.log("se agrego el producto al carrito");
                //Update cart in the database
                const result = await user_collection.updateOne({ userId: user.userId }, { $set: { cart: cart } });
                //console.log("se actualizo el carrito");
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return {"name": "Se actualizó el carrito"};
    
            } catch(err){
                //console.log(err);
                return {"name": "No se pudo actualizar el carrito"};
            }
            //return ok message;
        };

        /*
        -----------------------------------------------------------------------
        GET NOTIFICATIONS METHOD
        Gets the notifications of a user
        PARAMS:
            - userId: number, the id of the user to get the notifications
        RETURNS:
            - notifications: array of notifications
        */
        async getNotifications(userId: unknown){
            try{
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const user_collection = db.collection(USER_COLLECTION);
                
                //Get the user from the database, using the code
                const user = await user_collection.findOne({ userId: userId });
                SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                // If the user was found, return it, else return error
                if (user) {
                    //console.log("Se encontró: " + JSON.stringify(user, null, 2));
                    //If the roletype is admin get all the purchase history
                    let notifications = user.notifications;
                    return notifications;
                } else {
                    //console.log("No se encontró el user con el código: " + userId);
                    return {"name": "No se encontró el usuario"}; 
                }
            } catch(err){
                //console.log(err);
                return {"name": "Error al obtener las notificaciones"};
            }
        };

        /*
        -----------------------------------------------------------------------
        UPDATE NOTIFICATIONS METHOD
        Updates the notifications of a user to read
        PARAMS:
            - userId: number, the id of the user to update the notifications
        RETURNS:
            - ok message if the notifications were updated
            - error if the notifications were not updated
        */
        async updateNotificationState(userId: any){
            try{
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const user_collection = db.collection(USER_COLLECTION);
                const User = mongoose.model('User', UserSchema);

                const user = await user_collection.findOne({ userId: userId });
                if (!user){
                    //console.log("El usuario " +  userId + " no existe");
                    return {"name": "El usuario no existe"};
                }

                //Get notifications from user
                const notifications = user.notifications;
                
                //Update notifications to read
                for (let i = 0; i < notifications.length; i++) {
                    // if (notifications[i].read == true){
                    //     break;
                    // }
                    notifications[i].state = true;
                }

                //Update notifications in the database
                const result = await user_collection.updateOne({ userId: user.userId }, { $set: { notifications: notifications } });
                
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return {"name": "Se actualizaron las notificaciones"};

            } catch(err){
                //console.log(err);
                return {"name": "No se pudieron actualizar las notificaciones"};
            }
            //return ok message;
        };

        /*
        -----------------------------------------------------------------------
        IS UNREAD METHOD
        Checks if there are unread notifications
        PARAMS:
            - userId: number, the id of the user to check the notifications
        RETURNS:
            - true if there are unread notifications
            - false if there are no unread notifications
        */
        async isUnread(userId: any){
            try{
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const user_collection = db.collection(USER_COLLECTION);

                const User = mongoose.model('User', UserSchema);

                const user = await user_collection.findOne({ userId: userId });
                if (!user){
                    //console.log("El usuario " +  userId + " no existe");
                    return {"name": "El usuario no existe"};
                }

                //Get notifications from user
                const notifications = user.notifications;

                //Check if there are unread notifications
                for (let i = 0; i < notifications.length; i++) {
                    if (notifications[i].state == false){
                        return true;
                    }
                }
                return false;

            } catch(err){
                //console.log(err);
                return {"name": "No se pudo verificar si hay notificaciones sin leer"};
            }
            //return ok message;
        };

        /*
        -----------------------------------------------------------------------
        ADD NOTIFICATION
        Adds a notification to a user
        PARAMS:
            - userId: number, the id of the user to add the notification
            - notification: string, the notification to add
        RETURNS:
            - ok message if the notification was added
            - error if the notification was not added
        */
        async addNotification(notification: any){
            try{
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const user_collection = db.collection(USER_COLLECTION);

                const User = mongoose.model('User', UserSchema);

                if(!notification.hasOwnProperty("userId") || typeof notification.userId != "string"){
                    //console.log("La notificación no tiene la estructura correcta");
                    return {"name": "El body no tiene la estructura correcta"};
                }

                const user = await user_collection.findOne({ userId: notification.userId });
                if (!user){
                    //console.log("El usuario " +  userId + " no existe");
                    return {"name": "El usuario no existe"};
                }

                //Get notifications from user
                const notifications = user.notifications;

                

                //Validate notification JSON structure
                if (notification.length == 0){
                    //console.log("No se encontraron notificaciones");
                    return {"name": "No se encontraron notificaciones"};
                }
                if(!notification.hasOwnProperty("purchaseId") || !notification.hasOwnProperty("deliveryDate") || !notification.hasOwnProperty("notificationTime") || !notification.hasOwnProperty("state") || !notification.hasOwnProperty("notificationType")){
                    //console.log("La notificación no tiene la estructura correcta");
                    return {"name": "1. La notificación no tiene la estructura correcta"};
                }
                if(typeof notification.purchaseId != "string" || typeof notification.deliveryDate != "string" || typeof notification.notificationTime != "string" || typeof notification.state != "boolean" || typeof notification.notificationType != "string"){
                    //console.log("La notificación no tiene la estructura correcta");
                    return {"name": "La notificación no tiene la estructura correcta"};
                }

                // delete userId from notifications JSON
                const id = notifications.length + 1;
                const newNotification = {
                                        notificationId: id.toString(),
                                        purchaseId: notification.purchaseId,
                                        notificationTime: notification.notificationTime,
                                        deliveryDate: notification.deliveryTime,
                                        notificationType: notification.notificationType,
                                        state: notification.state
                                        }

                //Add notification
                notifications.push(newNotification);
                //Update notifications in the database
                const result = await user_collection.updateOne({ userId: user.userId }, { $set: { notifications: notifications } });
                
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return {"name": "Se agregó la notificación"};

            } catch(err){
                //console.log(err);
                return {"name": "No se pudo agregar la notificación"};
            }
            //return ok message;
        };
}
