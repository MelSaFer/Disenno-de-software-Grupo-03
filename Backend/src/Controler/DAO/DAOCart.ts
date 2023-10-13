import {DAO} from "./DAO"

class DAOCart implements DAO{

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

    update(object: unknown){
        //Si voy a agregar algo al carrito, me pego a mongo y lo agrego
        return true;
    };

    delete(object: unknown){
        return true;
    };
}
