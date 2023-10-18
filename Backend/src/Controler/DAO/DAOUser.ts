import {DAO} from "./DAO"
import mongoose from "mongoose";
import {UserSchema} from "./schemas/Schemas"
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME} from "../config";

export class DAOUser implements DAO{

    constructor(){};

    getAll(){

    };
    getObject(object: unknown){
        return true;
    };

    async create(object: any){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection("users");
            const User = mongoose.model('User', UserSchema);

            let newUser = new User({
                id: object.id,
                email: object.email,
                roleType: object.roleType,
                purchaseHistory: object.purchaseHistory,
                cart: object.cart
            });
            //const json = { name: "Holaaaaaa", type: "hello" };
            const json = JSON.stringify(newUser);
            const parsed = JSON.parse(json);
            //newUser.toJSON();
            console.log(json);
            await collection.insertOne(parsed);
            //newUser.save();
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
