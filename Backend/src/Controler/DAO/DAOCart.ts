import {DAO} from "./DAO"
import {CartSchema} from "./schemas/Schemas"
import mongoose from "mongoose";

export class DAOCart implements DAO{

    constructor(){};

    getAll(){

    };
    getObject(object: unknown){
        return true;
    };

    create(object: unknown) {
        // implementacion
        // Aqui llamamos al singleton
        // Me pego a Mongo para hacer una acción especifica
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
