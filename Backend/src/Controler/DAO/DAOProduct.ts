import {DAO} from "./DAO"
import mongoose from "mongoose";
import {productSchema} from "./schemas/Schemas"
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, PRODUCT_COLLECTION} from "../config";

export class DAOProduct implements DAO{

    constructor(){};

    getAll(){

    };

    async getObject(code_: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PRODUCT_COLLECTION);

            // Utiliza el modelo 'Product' para buscar un producto por su código
            const product = await collection.findOne({ code: code_ });
            
            if (product) {
                console.log("Se encontro: " + JSON.stringify(product, null, 2));
                return product;
            } else {
                console.log("No se encontró el producto con el código: " + code_);
                return false; // Si no se encuentra el producto, puedes retornar null o algún otro valor indicativo.
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
            const collection = db.collection(PRODUCT_COLLECTION);
            const Product = mongoose.model('Product', productSchema);

            let newProduct = new Product({
                code: object.code,
                description: object.description,
                cuantityAvailable: object.cuantityAvailable,
                image: object.image,
                price: object.price
            });

            const product = await collection.findOne({ code: object.code });
            if (product){
                console.log("El producto " +  object.code + " ya existe");
                return false;
            }
            const newProductJson = JSON.stringify(newProduct);
            const newProductparsed = JSON.parse(newProductJson);
            await collection.insertOne(newProductparsed);
            console.log("Se inserto: " + newProductJson);
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
