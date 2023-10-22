import { API_URL } from '../config';
import { DTOUser } from '../DTO/DTOUser';
import { DAOUser } from '../DAO/DAOUser';

export class AdminUser{


    constructor(){
        

    }

    getInfoUser(id: any){
        //const dtoUser = new DTOUser(1,1,[]);
        //return "esto es una prueba2.0";
        const daoUser = new DAOUser();
        const user = daoUser.getObject(1);
        return user;

    }


}