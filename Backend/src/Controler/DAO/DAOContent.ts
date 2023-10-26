import {DAO} from "./DAO"
import {ContentSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import { ObjectId } from 'mongodb';
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CONTENT_COLLECTION} from "../config";
import {DAOCategory} from "./DAOCategory";

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
        - error message if the contents were not found
    */
        async getAll(){
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(CONTENT_COLLECTION);
            
                //Get the contents from the database, using the code
                let contents = await collection.find({}).toArray();
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (contents) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(contents, null, 2));
                    return contents;
                }
                else{
                    return {"name": "No se encontraron contenidos"};
                }
                
            } catch (error) {
                //console.log(error);
                return {"name": "No se encontraron contenidos"};
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
        - error message if the Content was not found
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
            // If the content was found, return it, else return error message
            if (Content) {
                //console.log("Se encontro: " + JSON.stringify(Content, null, 2));
                return Content;
            } else {
                //console.log("No se encontró el contenido con el código: " + contentId);
                return {"name": "No se encontró el contenido"}; 
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el contenido"};
        }
    };

    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a Content in the database
    PARAMS:
        - object: Content
    RETURNS:
        - ok message if the Content was created
        - error message if the Content was not created
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
                //console.log("El contenido " +  object.title + " ya existe");
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                return {"name": "El contenido " + object.title + " ya existe"};
            }
          
            //Insert the product in the database, convert it to JSON and parse it
            const newContentJson = JSON.stringify(newContent);
            const newContentparsed = JSON.parse(newContentJson);
            await collection.insertOne(newContentparsed);

            //update id with the auto-generated id
            const doc = await collection.findOne({ title: object.title });
            if (!doc){
                //console.log("El content " +  object.title + " no existe");
                return {"name": "El contenido " + object.title + " no existe"};
            }

            //update the contentId with the stringObjectId
            const result = await collection.updateOne({ title: newContent.title }, { $set: { contentId: doc._id } });
            //validate if the content was updated
            if (result.modifiedCount > 0) {
                //console.log("Content actualizado con éxito");
                return {"name": "Contenido actualizado con éxito"};
            } else {
                //console.log("No se encontró el content para actualizar");
                return {"name": "No se encontró el contenido para actualizar"};
            }
        } catch(err){
            return {"name": "No se encontró el contenido"};
        }
    };

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - ok message if the product was updated
        - error message if the product was not updated
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
                    //console.log("El content " +  object._id + " no existe");
                    return {"name": "El contenido no existe"};
                }
                //Verify that the title is not already taken
                const contentRepeated = await collection.find({ title: object.title });
                for (let doc = await contentRepeated.next(); doc != null; doc = await contentRepeated.next()) {
                    if (doc._id != object._id){
                        //console.log("El content " +  object.title + " ya existe");
                        return {"name": "El contenido" + object.title + " ya existe"};
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
                    //console.log("Contenido actualizado con éxito " + JSON.stringify(object, null, 2));
                    return {"name": "Contenido actualizado con éxito"};
                } else {
                    //console.log("No se encontró el contenido para actualizar o no se actualizó ningun campo");
                    return {"name": "No se encontró el contenido para actualizar o no se actualizó ningun campo"};
                }
            } catch(err){
                //console.log(err);
                return {"name": "No se encontró el contenido"};
            } //end try-catch
        };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - ok message if the product was deleted
        - error message if the product was not deleted
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
                //console.log("El content " +  contentId + " no existe");
                return {"name": "El contenido no existe"};
            }
            //Delete the content in the database
            const result = await collection.deleteOne({ contentId: contentId });
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the content was deleted
            if (result.deletedCount > 0) {
                //console.log("Content eliminado con éxito");
                return {"name": "Contenido eliminado con éxito"};
            } else {
                //console.log("No se encontró el content para eliminar");
                return {"name": "No se pudo eliminar contenido"};
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se puso eliminar el contenido"};
        }
    };


    async getAllWithFilters( categoryNames: string[], tags : string[]){
        try {
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CONTENT_COLLECTION);
            
            //Get the contents from the database, using the code
            let contents = await collection.find({}).toArray();
            //----------------------------------------------------------------------------
            let filterCategory : any[] = [];
            if (categoryNames.length > 0){
                for (let i = 0; i < categoryNames.length; i++) {
                    filterCategory.push(contents.filter((content) => content.categoryName == categoryNames[i]));
                } 
            }

            //----------------------------------------------------------------------------
            let filterTags : any[] = [];
            if(tags.length > 0){
                for (let i = 0; i < tags.length; i++) {
                    filterTags.push(contents.filter((content) => content.tags.includes(tags[i])));
                } 
                //console.log("filterTags: " + JSON.stringify(filterTags));
            }

            if (filterCategory.length == 0){
                console.log("filterTags: " + JSON.stringify(filterTags));
                return filterTags
            } else if (filterTags.length == 0){
                //console.log("filterTags: " + JSON.stringify(filterCategory, null, 2));
                return filterCategory;
            }else{
                let resultado = filterCategory.concat(filterTags);
                //console.log("resultado: " + JSON.stringify(resultado, null, 2));
                //let uniqueIds = resultado.filter((content, index, self) => self.findIndex(c => c.contentId === content.contentId) === index).map((content) => content.contentId);
                let resultadoDef:any = [];
                for (let i = 0; i < resultado.length; i++) {
                    if(!resultadoDef.includes(resultado[i][0])){
                        //console.log("resultado[i]: " + JSON.stringify(resultado[i][0], null, 2));
                        resultadoDef.push(resultado[i][0]);
                    }
                }
                console.log("resultadoDef: " + JSON.stringify(resultadoDef, null, 2));
                return resultadoDef;
            }
        } catch (error) {
            //console.log(error);
            return {"name": "No se encontraron contenidos"};
        }
        
    }
};
    


