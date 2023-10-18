import {DAO} from "./DAO"

export class DAOContent implements DAO{

    constructor(){};

    getAll(){

    };
    getObject(object: unknown){
        return true;
    };

    create(object: unknown) {
        return true;
    };

    update(object: unknown){
        return true;
    };

    delete(object: unknown){
        return true;
    };
}
