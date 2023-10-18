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
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    };

    update(object: unknown){
        return true;
    };

    delete(object: unknown){
        return true;
    };
}
