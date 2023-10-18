import {DAO} from "./DAO"
import {contentSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CONTENT_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
 DAO CONTENT
 Class for managing the connection to the database and the queries related
  to the content
 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOContent implements DAO{

    constructor(){};

    getAll(){

    };
    async getObject(code_: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);
            const Content = await collection.findOne({ id: code_ });
            
            if (Content) {
                console.log("Se encontro: " + JSON.stringify(Content, null, 2));
                return Content;
            } else {
                console.log("No se encontró el contenido con el código: " + code_);
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
            const collection = db.collection(CONTENT_COLLECTION);
            const Content = mongoose.model('Content', contentSchema);

            let newContent = new Content({
                id: object.id,
                name: object.name,
                description: object.description,
                date: object.date,
                image: object.image,
                category: object.category,
                tags: object.tags
            });

            const product = await collection.findOne({ code: object.id });
            if (product){
                console.log("El contenido " +  object.code + " ya existe");
                return false;
            }
            const newContentJson = JSON.stringify(newContent);
            const newContentparsed = JSON.parse(newContentJson);
            await collection.insertOne(newContentparsed);
            console.log("Se inserto: " + newContentJson);
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
