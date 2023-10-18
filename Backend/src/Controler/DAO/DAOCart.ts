import {DAO} from "./DAO"
import {CartSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CART_COLLECTION} from "../config";

export class DAOCart implements DAO{

    constructor(){};

    getAll(){

    };
    async getObject(code_: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CART_COLLECTION);
            const cart = await collection.findOne({ id: code_ });
            if (cart) {
                console.log("Se encontro: " + JSON.stringify(cart, null, 2));
                return cart;
            } else {
                console.log("No se encontró el carrito con el código: " + code_);
                return false; // Si no se encuentra el producto, puedes retornar null o algún otro valor indicativo.
            }
        } catch(err){
            console.log(err);
            return false;
        }
    };

    async create(object: any) {
        // implementacion
        // Aqui llamamos al singleton
        // Me pego a Mongo para hacer una acción especifica
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CART_COLLECTION);
            const Cart = mongoose.model('Cart', CartSchema);
            let newCart = new Cart({
                id: object.id,
                items: object.items
            });

            const cart = await collection.findOne({ id: object.id });
            if (cart){
                console.log("El carrito " +  object.id + " ya existe");
                return false;
            }
            const newCartJson = JSON.stringify(newCart);
            const newCartparsed = JSON.parse(newCartJson);
            await collection.insertOne(newCartparsed);
            console.log("Se insertó: " + newCartJson);
            return true;
            
        }catch(err){
            console.log(err);
        }   
        return true;
    };

    update(object: any){
        //Si voy a agregar algo al carrito, me pego a mongo y lo agrego
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
