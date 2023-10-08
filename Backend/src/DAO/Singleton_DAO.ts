/*
Class Singleton_DAO

*/
import {DAO} from './DAO';

class Singleton_DAO{
    private static instance: Singleton_DAO;
    private accessDAO: DAO;

    //-------------------------------
    private Singleton_DAO( instance: Singleton_DAO, accessDAO: DAO ){
        //this.accessDAO = accessDAO;
        //
    }

    public static getInstance(): Singleton_DAO {
        if (!Singleton_DAO.instance){
            Singleton_DAO.instance = new Singleton_DAO();
        }
        return Singleton_DAO.instance;
    }

}