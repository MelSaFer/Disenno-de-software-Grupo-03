import { API_URL } from '../config';
import { DTOUser } from '../DTO/DTOUser';
import { DAOUser } from '../DAO/DAOUser';

export class AdminUser{


    constructor(){
        

    }

    getInfoUser(id: number){
        console.log(id)
        //const dtoUser = new DTOUser(1,1,[]);
        //return "esto es una prueba2.0";
        const daoUser = new DAOUser();
        const user = daoUser.getObject(id);
        return user;

    }

    updateCart(userId: number, productId: number, quantity: number){
        const daoUser = new DAOUser();
        const user = daoUser.updateCart(userId, productId, quantity);
        return user;
    }


}