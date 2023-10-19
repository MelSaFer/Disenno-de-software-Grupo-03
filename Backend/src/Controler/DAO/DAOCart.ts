import {DAO} from "./DAO"
import {CartSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CART_COLLECTION} from "../config";

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

    getAll(){

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
                return cart;
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

    update(object: any){
        //Si voy a agregar algo al carrito, me pego a mongo y lo agrego
        //no lo agrege porque creo que se plantea diferente al resto
        try{
            const cart = mongoose.model('Cart', CartSchema);
            cart.updateOne(object);
        }catch(err){
            console.log(err);
        }
        return true;
    };

    delete(object: unknown){
        return true;
    };
}
