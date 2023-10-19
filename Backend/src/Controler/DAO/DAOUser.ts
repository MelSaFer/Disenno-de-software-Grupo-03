import {DAO} from "./DAO"
import mongoose from "mongoose";
import {UserSchema} from "./schemas/Schemas"
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, USER_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
DAO USER
 Class for managing the connection to the database and the queries related
 to the user
 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOUser implements DAO{

    constructor(){};

    getAll(){

    };
    async getObject(code_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);
           
            //Get the cart from the database, using the code
            const cart = await collection.findOne({ id: code_ });
           
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            
            // If the cart was found, return it, else return false
            if (cart) {
                console.log("Se encontró: " + JSON.stringify(cart, null, 2));
                return cart;
            } else {
                console.log("No se encontró el usuario con el código: " + code_);
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
                id: object.id,
                email: object.email,
                roleType: object.roleType,
                purchaseHistory: object.purchaseHistory,
                cart: object.cart
            });

            const user = await collection.findOne({ id: object.id });
            if (user){
                console.log("El usuario " +  object.id + " ya existe");
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

    async update(object: any){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);  
            const collection = db.collection(USER_COLLECTION);
            //Get the model from the database with the schema
            const Cart = mongoose.model('User', UserSchema);
            //Create a new product with the object received
            let updatedUser = new Cart({
                id: object.id,
                email : object.email,
                roleType: object.roleType,
                purchaseHistory: object.purchaseHistory,
                cart: object.cart
            });
            //Create the update object for updating the content
            const InfoToUpdate = {
                $set: {
                    id: updatedUser.id,
                    email : updatedUser.email,
                    roleType: updatedUser.roleType,
                    purchaseHistory: updatedUser.purchaseHistory,
                    cart: updatedUser.cart
                    }
            };
    
            //Create list of items to update
            const newItemsList = [];
            //...?
    
            const result = await collection.updateOne({ id: updatedUser.id }, InfoToUpdate); //Update the product in the database
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
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

    delete(object: unknown){
        return true;
    };
}
