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

    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a Content in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - Content if the Content was found
        - false if the Content was not found
    */
    async getObject(code_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);
            //Get the Content from the database, using the code
            const Content = await collection.findOne({ id: code_ });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the content was found, return it, else return false
            if (Content) {
                console.log("Se encontro: " + JSON.stringify(Content, null, 2));
                return Content;
            } else {
                console.log("No se encontró el contenido con el código: " + code_);
                return false; 
            }

        } catch(err){
            console.log(err);
            return false;
        }
    };

    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a Content in the database
    PARAMS:
        - object: Content
    RETURNS:
        - true if the Content was created
        - false if the Content was not created
    */
    async create(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);
            const Content = mongoose.model('Content', contentSchema);

            //Create a new content with the object received
            let newContent = new Content({
                id: object.id,
                name: object.name,
                description: object.description,
                date: object.date,
                image: object.image,
                category: object.category,
                tags: object.tags
            });

            //Check if the content already exists
            const content = await collection.findOne({ id: object.id });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            if (content){
                console.log("El contenido " +  object.code + " ya existe");
                return false;
            }
            
            //Insert the product in the database, convert it to JSON and parse it
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

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - true if the product was updated
        - false if the product was not updated
    */
        async update(object: any){
            try{
                //Mongo connection with singleton
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);  
                const collection = db.collection(CONTENT_COLLECTION);
                //Get the model from the database with the schema
                const Content = mongoose.model('Content', contentSchema);
                //Create a new product with the object received
                let updatedContent = new Content({
                    id: object.id,
                    name: object.name,
                    description: object.description,
                    date: object.date,
                    image: object.image,
                    category: object.category,
                    tags: object.tags
                });
                //Create the update object for updating the content
                const InfoToUpdate = {
                    $set: {
                        name: updatedContent.name,  
                        description: updatedContent.description,
                        date: updatedContent.date,
                        image: updatedContent.image,
                        category: updatedContent.category,
                        tags: updatedContent.tags
                        }
                };
                const result = await collection.updateOne({ id: updatedContent.id }, InfoToUpdate); //Update the product in the database
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    console.log("Contenido actualizado con éxito " + JSON.stringify(updatedContent, null, 2));
                    return true;
                } else {
                    console.log("No se encontró el contenido para actualizar o no se actualizó ningun campo");
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
