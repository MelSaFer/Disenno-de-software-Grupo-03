import {DAO} from "./DAO"
import {CalendarSchema, EventSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CALENDAR_COLLECTION} from "../config";

export class DAOCalendar implements DAO{
    constructor(){}

    async getAll(){
            try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);

            const result = await collection.find().toArray();

            if(result.length > 0){
                return result;
            } else {
                return "No se encontraron eventos";
            }  
        } catch(err){
            console.log("Error al cargar el calendario", err);
        }    

    }
    
    async getObject(code: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
        } catch(err){
            console.log("Error al obtener el evento", err);
        }

    }


    async create(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
            const Event = mongoose.model('Event', EventSchema);

            let newEvent = new Event({
                userId: object.userId,
                name: object.name,
                description: object.description,
                startTime: object.startTime,
                endTime: object.endTime,
                date: object.date,
                eventType: object.eventType
            });

            //Insert the product in the database, convert it to JSON and parse it
            const newEventJson = JSON.stringify(newEvent);
            const newEventparsed = JSON.parse(newEventJson);
            await collection.insertOne(newEventparsed);
            //console.log("Se inserto: " + newEventJson);
            return {"name": "Se inserto la categoria" + newEvent.name};
        } catch(err){
            console.log("Error al crear el evento", err);
        }       
        
    }
    
    
    async update(object: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
        } catch(err){
            console.log("Error al actualizar el evento");
        }
    }

    async delete(code: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
        } catch(err){
            console.log("Error al eliminar el evento");
        }
    }
    
    async filterCalendar(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
        } catch(err){
            console.log("Error al filtrar el calendario")
        }
        
    }

    verifyOverlap(){
        //logica
        if(true){
            return true;
        } else {
            return false;
        }
    }
        

}