import {DAO} from "./DAO"
import {CartSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CART_COLLECTION} from "../config";
import { Cart } from "../../Model/Cart";

/*-----------------------------------------------------------------------
 DAO CART
 Class for managing the connection to the database and the queries related
 to the cart
 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOCart implements DAO{

    constructor(){};


    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the carts in the database
    PARAMS:
        - none
    RETURNS:
        - carts: array of carts
    */
    async getAll(){
        try {
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CART_COLLECTION);
        
            //Get the carts from the database, using the code
            let carts = await collection.find({}).toArray();
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database

            if (carts) {
                //console.log("Se encontraron los carritos: " + JSON.stringify(carts, null, 2));
                return carts;
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
    Gets a cart in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - Cart if the cart was found
        - false if the cart was not found
    */
    async getObject(code_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CART_COLLECTION);
           
            //Get the cart from the database, using the code
            const cart = await collection.findOne({ id: code_ });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the cart was found, return it, else return false
            if (cart) {
                console.log("Se encontró: " + JSON.stringify(cart, null, 2));
                //Insert the cart in the database, convert it to JSON and parse it
                const newCartJson = JSON.stringify(cart);
                const newCartparsed = JSON.parse(newCartJson);
                return newCartparsed;
            } else {
                console.log("No se encontró el carrito con el código: " + code_);
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
    Create a cart in the database
    PARAMS:
        - object: Cart
    RETURNS:
        - true if the cart was created
        - false if the cart was not created
    */
    async create(object: any) {
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CART_COLLECTION);
            const Cart = mongoose.model('Cart', CartSchema);
            
            //Create a new cart with the object received
            let newCart = new Cart({
                id: object.id,
                items: object.items
            });

            //Check if the cart already exists
            const cart = await collection.findOne({ id: object.id });
            if (cart){
                console.log("El carrito " +  object.id + " ya existe");
                return false;
            }
            //Insert the cart in the database, convert it to JSON and parse it
            const newCartJson = JSON.stringify(newCart);
            const newCartparsed = JSON.parse(newCartJson);
            await collection.insertOne(newCartparsed);
            console.log("Se insertó: " + newCartJson);
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return true;
            
        }catch(err){
            console.log(err);
        }   
        return true;
    };

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a cart in the database
    PARAMS:
        - object: Cart
    RETURNS:
        - true if the cart was updated
        - false if the cart was not updated
    */
    async update(object: any){
        //Si voy a agregar algo al carrito, me pego a mongo y lo agrego
        //no lo agrege porque creo que se plantea diferente al resto
        try{
            const cart = mongoose.model('Cart', CartSchema);
            const result = await cart.updateOne(object);
        }catch(err){
            console.log(err);
        }
        return true;
    };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a cart in the database
    PARAMS:
        - code: unknown
    RETURNS:    
        - true if the cart was deleted
        - false if the cart was not deleted
    */
    async delete(code_: unknown){
        try{
            console.log("code: " + code_);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CART_COLLECTION);
            //const Cart = mongoose.model('Cart', CartSchema);

            //Verify existence of the cart
            const cart = await collection.findOne({ id: code_ });
            if (!cart){
                console.log("El carrito " +  code_ + " no existe");
                return false;
            }
            //Delete the cart in the database
            const result = await collection.deleteOne({ id: code_ });
            
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the cart was deleted
            if (result.deletedCount > 0) {
                console.log("Carrito eliminado con éxito");
                return true;
            } else {
                console.log("No se encontró el carrito para eliminar");
                return false;
            }

        } catch(err){
            console.log(err);
        }
        return true;
    };

    /*
    -----------------------------------------------------------------------
    ADD CART ITEM METHOD
    Delete a cart in the database
    PARAMS:
        - 
    RETURNS:    
        - 
    */
    async addCartItem(code_: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const cart_collection = db.collection(CART_COLLECTION);
            const Cart = mongoose.model('Cart', CartSchema);
            



            

        } catch(err){
            console.log(err);
        }
        return true;
    };
}
