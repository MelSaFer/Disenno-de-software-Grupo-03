import {DAO} from "./DAO"
import mongoose from "mongoose";
import {ProductSchema} from "./schemas/Schemas"
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, PRODUCT_COLLECTION} from "../config";


/*-----------------------------------------------------------------------
 DAO PRODUCT
 Class for managing the connection to the database and the queries related
 to the Product

PRODUCT ATTRIBUTES:
    - productId: string
    - description: string
    - cuantityAvailable: number
    - imageId: string
    - price: number

 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOProduct implements DAO{

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
                const collection = db.collection(PRODUCT_COLLECTION);
            
                //Get the contents from the database, using the code
                let product = await collection.find({}).toArray();
                
                //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (product) {
                    return product;
                }
                else{
                    return {"name": "No se encontraron productos"};
                }
            } catch (error) {
                //console.log(error);
                return {"name": "No se encontraron productos"};
            }
            
    
        };

    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a product in the database
    PARAMS:
        - code: String | Undefined
    RETURNS:
        - Product if the product was found
        - error message if the product was not found
    */
    async getObject(idProduct_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PRODUCT_COLLECTION);

            //Get the product from the database, using the code
            const product = await collection.findOne({ productId: idProduct_ });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the product was found, return it, else return error message
            if (product) {
                //console.log("Se encontro: " + JSON.stringify(product, null, 2));
                return product;
            } else {
                //console.log("No se encontró el producto con el código: " + idProduct_);
                return {"name": "No se encontró el producto"}; 
                
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el producto"};
        }
    };

    /*
    -----------------------------------------------------------------------
    GET NAME METHOD
    Gets a product name in the database
    PARAMS:
        - code: number
    RETURNS:
        - Product if the product was found
        - error message if the product was not found
    */

    async getProductName(idProduct_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PRODUCT_COLLECTION);

            //Get the product from the database, using the code
            const product = await collection.findOne({ productId: idProduct_ });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the product was found, return it, else return error message
            if (product) {
                console.log("Se encontro: " + JSON.stringify(product, null, 2));
                return product.description;
            } else {
                //console.log("No se encontró el producto con el código: " + idProduct_);
                return {"name": "No se encontró el producto"}; 
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el producto"};
        }
    };

    /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Create a product in the database
    PARAMS:
        - object: Product
    RETURNS:
        - ok message if the product was created
        - error message if the product was not created
    */
    async create(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PRODUCT_COLLECTION);
            const Product = mongoose.model('Product', ProductSchema);

            //Create a new product with the object received
            let newProduct = new Product({
                productId: "",
                name: object.name,
                description: object.description,
                cuantityAvailable: object.cuantityAvailable,
                imageId: object.imageId,
                price: object.price
            });
            //Check if the product already exists
            const product = await collection.findOne({ name: newProduct.name });
            if (product){
                //console.log("El producto " +  object.name + " ya existe");
                SingletonMongo.getInstance().disconnect_();
                return {"name": "Ya existe un producto con ese nombre"};
            }
            //Insert the product in the database, convert it to JSON and parse it
            const newProductJson = JSON.stringify(newProduct);
            const newProductparsed = JSON.parse(newProductJson);
            await collection.insertOne(newProductparsed);

            
            const theProduct = await collection.findOne({ name: newProduct.name });
            if(!theProduct){
                //console.log("ERROR AL INSERTAR EL PRODUCTO");
                SingletonMongo.getInstance().disconnect_();
                return {"name": "Error al insertar el producto"};
            }
            //update the contentId with the stringObjectId
            const result = await collection.updateOne({ name: object.name }, { $set: { productId: theProduct._id } });
            //console.log("Se inserto: " + newProductJson);
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return {"name": "Se insertó el producto con éxito"};
        } catch(err){
            //console.log(err);
            return {"name": "Error al insertar el producto"};
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
            const collection = db.collection(PRODUCT_COLLECTION);
            //Get the model from the database with the schema
            const Product = mongoose.model('Product', ProductSchema);
            //Create a new product with the object received
            let updatedProduct = new Product({
                productId: object.productId,
                name: object.name,
                description: object.description,
                cuantityAvailable: object.cuantityAvailable,
                imageId: object.imageId,
                price: object.price
            });
            //Check if the product exists
            const product_ = await collection.findOne({productId: object.productId});
            if (!product_){
                //console.log("El producto " +  JSON.stringify(object.productId) + " no existe");
                return {"name": "El producto no existe"};
            }
            
            //Verify that the name is not already taken
            const contentRepeated = await collection.find({ name: object.name });
            for (let doc = await contentRepeated.next(); doc != null; doc = await contentRepeated.next()) {
                if (doc._id != object._id){
                    console.log("El producto " +  JSON.stringify(object.title) + " ya existe");
                    return {"name": "Ya existe un producto con ese nombre"};
                }
            }

            //Create the update object for updating the product
            const InfoToUpdate = {
                $set: {
                    description: updatedProduct.description,
                    name: updatedProduct.name,
                    cuantityAvailable: updatedProduct.cuantityAvailable,
                    imageId: updatedProduct.imageId,
                    price: updatedProduct.price
                    }
            };
            const result = await collection.updateOne({ productId: object.productId }, InfoToUpdate); //Update the product in the database
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the product was updated  
            if (result.modifiedCount > 0) {
                //console.log("Producto actualizado con éxito " + JSON.stringify(updatedProduct, null, 2));
                return {"name": "Producto actualizado con éxito"};
            } else {
                //console.log("No se encontró el producto para actualizar o no se actualizó ningun campo");
                return {"name": "No se encontró el producto a actualizar o no se actualizó ningun campo"};
            }
        } catch(err){
            console.log(err);
            return {"name": "No se encontró el producto"};
        } //end try-catch
        //return ok message;
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
    async delete(productId_: unknown){
        try{
            //Mongo connection with singleton
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PRODUCT_COLLECTION);

            //Verify existence of the product
            const product = await collection.findOne({ productId: productId_ });
            if (!product){
                //console.log("El producto " +  productId_ + " no existe");
                return {"name": "El producto no existe"};
            }
            //Delete the product in the database
            const result = await collection.deleteOne({ productId: productId_ });
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the product was deleted
            if (result.deletedCount > 0) {
                //console.log("Product eliminado con éxito");
                return {"name": "Producto eliminado con éxito"};
            } else {
                //console.log("No se encontró el product para eliminar");
                return {"name": "No se encontró el producto"};
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el producto"};
        }
    };
}
