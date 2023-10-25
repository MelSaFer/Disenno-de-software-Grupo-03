import {DAO} from "./DAO"
import {ContentSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CONTENT_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
 DAO CONTENT
 Class for managing the connection to the database and the queries related
  to the content
 METHODS:
    - getAll()
    - getObject(contentId: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOContent implements DAO{

    constructor(){};

    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the contents in the database
    PARAMS:
        - none
    RETURNS:
        - contents: array of contents
    */
        async getAll(){
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(CONTENT_COLLECTION);
            
                //Get the contents from the database, using the code
                let contents = await collection.find({}).toArray();
                // const cursor = await collection.find();
                // for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                //     purchaseHistory.push(doc);
                // }
                
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (contents) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(contents, null, 2));
                    return contents;
                }
                else{
                    console.log("No se encontraron carritos");
                    return false;
                }
                
                
    
            } catch (error) {
                console.log(error);
                return false;
            }
            
    
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
    async getObject(contentId: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);
            //Get the Content from the database, using the code
            const Content = await collection.findOne({ contentId: contentId });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the content was found, return it, else return false
            if (Content) {
                console.log("Se encontro: " + JSON.stringify(Content, null, 2));
                return Content;
            } else {
                console.log("No se encontró el contenido con el código: " + contentId);
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
            console.log("123")
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);
            const Content = mongoose.model('Content', ContentSchema);

            //Create a new content with the object received
            let newContent = new Content({
                contentId: " ",
                title: object.title,
                description: object.description,
                date: object.date,
                imageId: object.imageId,
                categoryName: object.categoryName,
                tags: object.tags
            });

            //Check if the content already exists
            const content = await collection.findOne({ title: object.title });
            if (content){
                console.log("El contenido " +  object.title + " ya existe");
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return false;
            }
          
            //Insert the product in the database, convert it to JSON and parse it
            const newContentJson = JSON.stringify(newContent);
            const newContentparsed = JSON.parse(newContentJson);
            await collection.insertOne(newContentparsed);

            //update id with the auto-generated id
            const doc = await collection.findOne({ title: object.title });
            if (!doc){
                console.log("El content " +  object.title + " no existe");
                return false;
            }

            //update the contentId with the stringObjectId
            const result = await collection.updateOne({ title: newContent.title }, { $set: { contentId: doc._id } });
            //validate if the content was updated
            if (result.modifiedCount > 0) {
                console.log("Content actualizado con éxito");
            } else {
                console.log("No se encontró el content para actualizar");
                return false;
            }

            console.log("Se inserto: " + newContentJson);
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
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
                const Content = mongoose.model('Content', ContentSchema);
                //Create a new product with the object received
                let updatedContent = new Content({
                    _id: object._id,
                    title: object.title,
                    description: object.description,
                    date: object.date,
                    imageId: object.imageId,
                    categoryName: object.categoryName,
                    tags: object.tags
                });
                //Verify existence of the content
                const content = await collection.findOne({ contentId: object._id });
                if (!content){
                    console.log("El content " +  object._id + " no existe");
                    return false;
                }
                //Verify that the title is not already taken
                const contentRepeated = await collection.find({ title: object.title });
                for (let doc = await contentRepeated.next(); doc != null; doc = await contentRepeated.next()) {
                    if (doc._id != object._id){
                        console.log("El content " +  object.title + " ya existe");
                        return false;
                    }
                }
                

                //Create the update object for updating the content
                const InfoToUpdate = {
                    $set: {
                        _id: object._id,
                        title: object.title,
                        description: object.description,
                        date: object.date,
                        imageId: object.imageId,
                        categoryName: object.categoryName,
                        tags: object.tags
                        }
                };
                const result = await collection.updateOne({ contentId: object._id }, InfoToUpdate); //Update the product in the database
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                //Check if the product was updated  
                if (result.modifiedCount > 0) {
                    console.log("Contenido actualizado con éxito " + JSON.stringify(object, null, 2));
                    return true;
                } else {
                    console.log("No se encontró el contenido para actualizar o no se actualizó ningun campo");
                    return false;
                }
            } catch(err){
                console.log(err);
                return false
            } //end try-catch
        };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - true if the product was deleted
        - false if the product was not deleted
    */
    async delete(contentId: unknown){
        try{
            console.log("code: " + contentId);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);

            //Verify existence of the content
            const content = await collection.findOne({ contentId: contentId });
            if (!content){
                console.log("El content " +  contentId + " no existe");
                return false;
            }
            //Delete the content in the database
            const result = await collection.deleteOne({ contentId: contentId });
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the content was deleted
            if (result.deletedCount > 0) {
                console.log("Content eliminado con éxito");
                return true;
            } else {
                console.log("No se encontró el content para eliminar");
                return false;
            }

        } catch(err){
            console.log(err);
        }
        return true;
    };
    
}
