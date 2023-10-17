import {DAO} from "./DAO"
import mongoose from "mongoose";
import {UserSchema} from "./schemas/Schemas"

export class DAOUser implements DAO{

    constructor(){};

    getAll(){

    };
    getObject(object: unknown){
        return true;
    };

    async create(object: any){
        try{
            const User = mongoose.model('User', UserSchema);
            let newUser = new User({
                id: object.id,
                email: object.email,
                roleType: object.roleType,
                purchaseHistory: object.purchaseHistory,
                cart: object.cart
            });
            await newUser.save();
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
