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
    getObject(object: unknown){
        return true;
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
    async delete(code_: unknown){
        try{
            console.log("code: " + code_);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(USER_COLLECTION);

            //Verify existence of the user
            const user = await collection.findOne({ id: code_ });
            if (!user){
                console.log("El user " +  code_ + " no existe");
                return false;
            }
            //Delete the user in the database
            const result = await collection.deleteOne({ id: code_ });
            
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
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
}
