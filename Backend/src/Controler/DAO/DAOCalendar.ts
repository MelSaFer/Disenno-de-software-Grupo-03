import {DAO} from "./DAO"
import {CalendarSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CATEGORY_COLLECTION} from "../config";

export class DAOCalendar implements DAO{
    constructor(){}

    async getAll(){

    }
    
    async getObject(code: unknown){


    }


    async create(object: unknown){

    }
    
    
    async update(object: unknown){

    }

    async delete(code: unknown){

    }
    
    async filterCalendar(object: any){
        
    }
        

}