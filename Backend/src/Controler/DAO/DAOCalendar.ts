import {DAO} from "./DAO"
import {CalendarSchema, EventSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, CALENDAR_COLLECTION} from "../config";
import { parseISO, differenceInCalendarISOWeeks, differenceInCalendarMonths, differenceInCalendarYears, endOfWeek,  startOfISOWeek, getMonth, getYear} from 'date-fns';
import { DAOUser } from "./DAOUser";
import { Event } from "../Decorator/event";

// var parseISO = require('date-fns/parseISO')
// var differenceInCalendarISOWeeks = require('date-fns/differenceInCalendarISOWeeks')
// var differenceInCalendarMonths  = require('date-fns/differenceInMonths')
// var differenceInCalendarYears = require('date-fns/differenceInYears')
// var endOfWeek = require('date-fns/endOfWeek')
// var startOfISOWeek = require('date-fns/startOfISOWeek')
// var getMonth = require('date-fns/getMonth')
// var getYear = require('date-fns/getYear')

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
                location: object.location,
                startTime: object.startTime,
                endTime: object.endTime,
                date: object.date,
                eventType: object.eventType
            });

            //Verify if he userId is valid
            const daoUser = new DAOUser();
            console.log("newEvent.userId: ", newEvent.userId)
            const user = await daoUser.getObject(newEvent.userId);
            console.log("user: ", user)
            if(user.name == "No se encontró el usuario"){
                return {"name": "No se encontró el usuario"};
            }

            //Insert the product in the database, convert it to JSON and parse it
            const newEventJson = JSON.stringify(newEvent);
            const newEventparsed = JSON.parse(newEventJson);
            await collection.insertOne(newEventparsed);
            //console.log("Se inserto: " + newEventJson);
            return object.eventType;
            //return {"name": "Se insertó el evento" + newEvent.name};
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
                location: object.location,
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
                    location: updatedEvent.location,
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

    filterEvents(filter: string, events: any){
        let subarray = [];
        let filteredEvents = [];
        let events2 = [];
        for (; events.length != 0;) { //recorre el arreglo de eventos
            //console.log("events: ", events)

            //extraer el primer evento del arreglo en cada vuelta para tomarlo como punto de comparación con el resto
            subarray.push(events[0]);
            let eventDate = parseISO(events[0].date);

            //eliminar el primer evento del arreglo para no volver a compararlo
            events.splice(0, 1);
            events2 = events; //copia del arreglo de eventos para no perder los datos originales
            
            for (let j = 0; j < events2.length; j++) { //recorre la copia del arreglo de eventos
                //console.log(j)
                //console.log(events2.length)
                
                // extraer el primer evento de la copia del arreglo para compararlo con el evento de la vuelta anterior
                let eventDate2 = parseISO(events2[j].date);
                //let diffWeeks = differenceInCalendarISOWeeks(eventDate, eventDate2)

                // calcular la diferencia entre las fechas de los eventos según el filtro (semana, mes, año)
                let diff = filter == "Week" ? differenceInCalendarISOWeeks(eventDate, eventDate2) : (filter == "Month") ? this.differenceInCalendarMonths(eventDate, eventDate2) : differenceInCalendarYears(eventDate, eventDate2);
                //console.log("date1:", eventDate, "date2:", eventDate2, "diff: ", diff)

                // si la diferencia es 0, quiere decir que los eventos son del mismo periodo, por lo tanto se agregan al subarreglo
                if (diff == 0) {
                    console.log("enter")
                    subarray.push(events2[j]);
                    events2.splice(j, 1);
                    j--;
                }
            }
            //console.log("subarray: ", subarray)

            // una vez que se recorrió el arreglo de eventos, se agrega el subarreglo al arreglo de eventos filtrados
            const period = (filter == "Week") ? this.weekFilter(eventDate) : ((filter == "Month") ? this.monthFilter(eventDate) : this.yearFilter(eventDate)); //se obtiene el periodo del subarreglo
            filteredEvents.push({"period": period, "events": subarray});
            subarray = []; //se vacía el subarreglo para la siguiente vuelta
        }

        return filteredEvents;
    }

    /*
    DIFFERENCE IN CALENDAR WEEKS
    */
    differenceInCalendarMonths(date1: any, date2: any){
        let diff = Math.abs(getMonth(date1) - getMonth(date2));
        return diff;
    }

    /*
    DIFFERENCE IN CALENDAR YEARS
    */
    differenceInCalendarYears(date1: any, date2: any){
        let diff = Math.abs(getYear(date1) - getYear(date2));
        return diff;
    }

    /*
    FILTERS
    */
    weekFilter(date_: any){
        //const date_ = parseISO(date);
        return startOfISOWeek(date_) + "to " + endOfWeek(date_, { weekStartsOn: 1 })
    }

    monthFilter(date_: any){
        //const date_ = parseISO(date);
        let mes = ""
        switch(getMonth(date_)){
            case 0:
                mes = "Enero";
                break;
            case 1:
                mes = "Febrero";
                break;
            case 2:
                mes = "Marzo";
                break;
            case 3:
                mes = "Abril";
                break;
            case 4:
                mes = "Mayo";
                break;
            case 5:
                mes = "Junio";
                break;
            case 6:
                mes = "Julio";
                break;
            case 7:
                mes = "Agosto";
                break;
            case 8:
                mes = "Septiembre";
                break;
            case 9:
                mes = "Octubre";
                break;
            case 10:
                mes = "Noviembre";
                break;
            case 11:
                mes = "Diciembre";
                break;
        }

        return mes + " de " + getYear(date_);
    }

    yearFilter(date_: any){
        //const date_ = parseISO(date);
        return getYear(date_);
    }
    

    /*
    MAIN FILTER FUNCTION
    params: object which is the request body that contains the filter
    */
    async filterCalendar(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(CALENDAR_COLLECTION);

            let events = await collection.find().toArray();

            //let events2 = events;
            
            let filter = object.filter;
            let filteredEvents = this.filterEvents(filter, events);;
            

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
            const Event = mongoose.model('Event', EventSchema);

            let theEvent = new Event({
                startTime: object.startTime,
                endTime: object.endTime,
            });

            let events = await collection.find().toArray();
            for(let i = 0; i < events.length; i++){
                const thisEventRange = {
                    startTime: new Date(events[i].startTime),
                    endTime: new Date(events[i].endTime)
                }
                //verifies if there is an overlap between events
                if( thisEventRange.startTime <= theEvent.startTime && theEvent.startTime <= thisEventRange.endTime){
                    console.log("Hay superposición de eventos")
                    return true;
                } else if(theEvent.startTime <= thisEventRange.endTime && thisEventRange.endTime <= theEvent.endTime){
                    console.log("Hay superposición de eventos")
                    return true;
                }

            }
            return false;
        } catch(err){
            console.log("Error al verificar la superposición de eventos: ", err)
        }

    }

    public createEvent(){
        const event = new Event();
        return event;
    }
        

}