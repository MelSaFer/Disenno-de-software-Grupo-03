import {DAO} from "./DAO"
import {CalendarSchema, EventSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CALENDAR_COLLECTION} from "../config";
import { startOfWeek, addDays, format, differenceInWeeks } from 'date-fns';
import { DAOUser } from "./DAOUser";

var parseISO = require('date-fns/parseISO')

/*
DAO CALENDAR
Class that implements the DAO interface, this class is in charge of the the CRUD and more operations related to the calendar
METHODS:
        * getAll(): Gets all the events from the database
        * getObject(idEvent_: any): Gets an event from the database, using the code
        * create(object: any): Creates an event in the database
        * update(object: any): Updates an event in the database
        * delete(code: any): Deletes an event from the database
        * filterCalendar(object: any): Filters the calendar by week, day or month
        * verifyOverlap(): Verifies if there is an overlap between events
*/
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
    
    async getObject(idEvent_: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
            console.log("idEvent_: ", idEvent_)
            //Get the event from the database, using the code
            const event = await collection.findOne({ _id: idEvent_._id });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the event was found, return it, else return error message
            if (event) {
                return event;
            } else {
                return {"name": "No se encontró el evento"}; 
                
            }

        } catch(err){
            //console.log(err);
            return {"name": "No se encontró el evento"};
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

            //Verify if he userId is valid
            const daoUser = new DAOUser();
            const user = await daoUser.getObject({"_id": newEvent.userId});
            if(user.name == "No se encontró el usuario"){
                return {"name": "No se encontró el usuario"};
            }

            //Insert the product in the database, convert it to JSON and parse it
            const newEventJson = JSON.stringify(newEvent);
            const newEventparsed = JSON.parse(newEventJson);
            await collection.insertOne(newEventparsed);
            //console.log("Se inserto: " + newEventJson);
            return {"name": "Se insertó el evento" + newEvent.name};
        } catch(err){
            console.log("Error al crear el evento", err);
        }       
        
    }
    
    
    async update(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
            const Event = mongoose.model('Event', EventSchema);

            let updatedEvent = new Event({
                _id: object._id,
                userId: object.userId,
                name: object.name,
                description: object.description,
                startTime: object.startTime,
                endTime: object.endTime,
                date: object.date,
                eventType: object.eventType
            });

            //Verify if the event exists
            const daoCalendar = new DAOCalendar();
            const event = await daoCalendar.getObject({"_id": object._id});
            if(event.name == "No se encontró el evento"){
                return {"name": "No se encontró el evento"};
            }
            
            const InfoToUpdate = {
                $set: {
                    userId: updatedEvent.userId,
                    name: updatedEvent.name,
                    description: updatedEvent.description,
                    startTime: updatedEvent.startTime,
                    endTime: updatedEvent.endTime,
                    date: updatedEvent.date,
                    eventType: updatedEvent.eventType
                }
            };
            const result = await collection.updateOne({ _id: object._id }, InfoToUpdate);
            console.log("Se actualizó el evento: " + updatedEvent.name);
            if(result.modifiedCount > 0){
                return {"name": "Se actualizó el evento"};
            } else {
                return {"name": "No se actualizó el evento"};
            }

        } catch(err){
            console.log("Error al actualizar el evento");
        }
    }

    async delete(code: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);
            const Event = mongoose.model('Event', EventSchema);
            //Verify if the event exists
            const daoCalendar = new DAOCalendar();
            const event = await daoCalendar.getObject(code);
            if(event.name == "No se encontró el evento"){
                return {"name": "No se encontró el evento"};
            }
             
            const result = await collection.deleteOne(code);
            if(result.deletedCount > 0){
                return {"name": "Se eliminó el evento"};
            } else {
                return {"name": "No se eliminó el evento"};
            }

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

            let events = await collection.find().toArray();

            let events2 = events;
            let filteredEvents = [];
            let filter = object.filter;

            if(filter == "Week"){
                let subarray = [];
                for (let i = 0; events.length != 0; i++) {
                    console.log("events: ", events)
                    subarray.push(events[0]);
                    events.splice(0, 1);
                    events2 = events;
                    let eventDate = parseISO(events[i].date);
                    
                    //sortedEvents.splice(i, 1);
                    for (let j = 0; j < events2.length; j++) {
                        //console.log("f2: ", sortedEvents[j])
                        console.log(j)
                        console.log(events2.length)
                        let eventDate2 = parseISO(events2[j].date);
                        let diffWeeks = differenceInWeeks(eventDate, eventDate2)

                        if (diffWeeks == 0 && events[i].eventId != events2[j].eventId) {
                            subarray.push(events2[j]);
                            events2.splice(j, 1);
                            j--;
                        }
                    }
                    console.log("subarray: ", subarray)
                    filteredEvents.push({"week": "", "events": subarray});
                    subarray = [];
                }
            } else if(filter == "Day"){
                //logica
            } else if(filter == "Month"){
                //logica
            }

            console.log("filteredEvents: ", filteredEvents)
            return filteredEvents;
            
        } catch(err){
            console.log("Error al filtrar el calendario: ", err)
        }
        
    }

    async verifyOverlap(object: any){
        //logica
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);

            let events = await collection.find().toArray();

        } catch(err){
            console.log("Error al verificar la superposición de eventos: ", err)
        }

        if(true){
            return true;
        } else {
            return false;
        }
    }
        

}