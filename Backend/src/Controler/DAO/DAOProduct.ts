import {DAO} from "./DAO"
import mongoose from "mongoose";
import {UserSchema, productSchema} from "./schemas/Schemas"
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, PRODUCT_COLLECTION} from "../config";

export class DAOProduct implements DAO{

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
            const collection = db.collection(PRODUCT_COLLECTION);
            const Product = mongoose.model('Product', productSchema);

            let newProduct = new Product({
                code: object.code,
                description: object.description,
                cuantityAvailable: object.cuantityAvailable,
                image: object.image,
                price: object.price
            });

            const newProductJson = JSON.stringify(newProduct);
            const newProductparsed = JSON.parse(newProductJson);
            await collection.insertOne(newProductparsed);
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
