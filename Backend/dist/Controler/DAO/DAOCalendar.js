"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOCalendar = void 0;
const Schemas_1 = require("./schemas/Schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const SingletonMongo_1 = require("../Singleton/SingletonMongo");
const config_1 = require("../config");
const date_fns_1 = require("date-fns");
const event_1 = require("../Decorator/event");
const makeupEvent_1 = require("../Decorator/makeupEvent");
const EVENT_TYPE_1 = require("../Decorator/EVENT_TYPE");
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
        * createEvent(): Creates an event with the decorator
*/
class DAOCalendar {
    constructor() { }
    /*
        -----------------------------------------------------------------------
        GET ALL METHOD
        Gets all the events in the database
        PARAMS:
            - None
        RETURNS:
            - All the events in the database
            - error message if there was an error
        */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                const result = yield collection.find().toArray();
                console.log(result);
                if (result.length > 0) {
                    return result;
                }
                else {
                    return "No se encontraron eventos";
                }
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    /*
        -----------------------------------------------------------------------
        GET OBJECT METHOD
        Gets an event from the database, using the code
        PARAMS:
            - idEvent_: id of the event to get
        RETURNS:
            - The event
            - error message if there was an error
        */
    getObject(idEvent_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                console.log("idEvent_: ", idEvent_);
                //Get the event from the database, using the code
                const event = yield collection.findOne({ _id: idEvent_._id });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the event was found, return it, else return error message
                if (event) {
                    return event;
                }
                else {
                    return { name: "No se encontró el evento" };
                }
            }
            catch (err) {
                //console.log(err);
                return { name: "No se encontró el evento" };
            }
        });
    }
    /*
        -----------------------------------------------------------------------
        CREATE METHOD
        Creates an event in the database
        PARAMS:
            - object: object that contains the information of the event to create
        RETURNS:
            - Success message if the event was created
            - error message if there was an error
        */
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                const Event = mongoose_1.default.model("Event", Schemas_1.EventSchema);
                //console.log("object create event: ", object);
                let newEvent = new Event({
                    purchaseId: object.purchaseId,
                    userId: object.userId,
                    name: object.name,
                    description: object.description,
                    location: object.location,
                    startTime: object.startTime,
                    endTime: object.endTime,
                    date: object.date,
                    eventType: object.eventType,
                });
                const daoCalendar = new DAOCalendar();
                // set the new event with the decorator
                if (object.eventType == EVENT_TYPE_1.EVENT_TYPE.MAKEUP) {
                    let theNewEvent = daoCalendar.createEvent();
                    theNewEvent.setEventType(object.eventType);
                    let theEvent = new makeupEvent_1.MakeupEvent(theNewEvent); //Decorates the event
                    newEvent.eventType = theNewEvent.getEventType(); //Sets the event type to the schema
                }
                //Insert the product in the database, convert it to JSON and parse it
                const newEventJson = JSON.stringify(newEvent);
                const newEventparsed = JSON.parse(newEventJson);
                yield collection.insertOne(newEventparsed);
                //console.log("Se inserto: " + newEventJson);
                //return theEvent
                return object.eventType;
                //return {"name": "Se insertó el evento" + newEvent.name};
            }
            catch (err) {
                console.log("Error al crear el evento", err);
            }
        });
    }
    /*
        -----------------------------------------------------------------------
        UPDATE METHOD
        Updates an event in the database
        PARAMS:
            - object: object that contains the information of the event to update
        RETURNS:
            - Success message if the event was updated
            - error message if there was an error
        */
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                const Event = mongoose_1.default.model("Event", Schemas_1.EventSchema);
                let updatedEvent = new Event({
                    _id: object._id,
                    userId: object.userId,
                    name: object.name,
                    description: object.description,
                    location: object.location,
                    startTime: object.startTime,
                    endTime: object.endTime,
                    date: object.date,
                    eventType: object.eventType,
                });
                console.log("updatedEvent: ", updatedEvent);
                //Verify if the event exists
                const daoCalendar = new DAOCalendar();
                const event = yield daoCalendar.getObject({ _id: object._id });
                if (event.name == "No se encontró el evento") {
                    return { name: "No se encontró el evento" };
                }
                //Verify if the event has overlap with another event
                const overlap = yield daoCalendar.verifyOverlap(updatedEvent);
                //console.log("overlap: ", overlap);
                if (overlap) {
                    return { name: "Hay superposición con otro evento" };
                }
                const InfoToUpdate = {
                    $set: {
                        userId: updatedEvent.userId,
                        name: updatedEvent.name,
                        description: updatedEvent.description,
                        location: updatedEvent.location,
                        startTime: updatedEvent.startTime.toISOString(),
                        endTime: updatedEvent.endTime.toISOString(),
                        date: updatedEvent.date.toISOString(),
                        eventType: updatedEvent.eventType,
                    },
                };
                const result = yield collection.updateOne({ _id: object._id }, InfoToUpdate);
                if (result.modifiedCount > 0) {
                    return { name: "Se actualizó el evento" };
                }
                else {
                    return { name: "No se actualizó el evento" };
                }
            }
            catch (err) {
                console.log("Error al actualizar el evento");
            }
        });
    }
    /*
        -----------------------------------------------------------------------
        DELETE METHOD
        Deletes an event from the database
        PARAMS:
            - code: code of the event to delete
        RETURNS:
            - Success message if the event was deleted
            - error message if there was an error
        */
    delete(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                const Event = mongoose_1.default.model("Event", Schemas_1.EventSchema);
                //Verify if the event exists
                const daoCalendar = new DAOCalendar();
                const event = yield daoCalendar.getObject(code);
                if (event.name == "No se encontró el evento") {
                    return { name: "No se encontró el evento" };
                }
                const result = yield collection.deleteOne(code);
                if (result.deletedCount > 0) {
                    return { name: "Se eliminó el evento" };
                }
                else {
                    return { name: "No se eliminó el evento" };
                }
            }
            catch (err) {
                console.log("Error al eliminar el evento");
            }
        });
    }
    /*
        -----------------------------------------------------------------------
        FILTER EVENTS
        Filters the events by week, month or year
        PARAMS:
            - filter: string that contains the filter (week, month or year)
            - events: array that contains all the events
        RETURNS:
            - filteredEvents: array that contains the filtered events
        */
    filterEvents(filter, events) {
        let subarray = [];
        let filteredEvents = [];
        let events2 = [];
        for (; events.length != 0;) {
            //recorre el arreglo de eventos
            //console.log("events: ", events)
            //extraer el primer evento del arreglo en cada vuelta para tomarlo como punto de comparación con el resto
            subarray.push(events[0]);
            let eventDate = (0, date_fns_1.parseISO)(events[0].date);
            //eliminar el primer evento del arreglo para no volver a compararlo
            events.splice(0, 1);
            events2 = events; //copia del arreglo de eventos para no perder los datos originales
            //console.log("events: ", events);
            for (let j = 0; j < events2.length; j++) {
                //recorre la copia del arreglo de eventos
                // extraer el primer evento de la copia del arreglo para compararlo con el evento de la vuelta anterior
                let eventDate2 = (0, date_fns_1.parseISO)(events2[j].date);
                // calcular la diferencia entre las fechas de los eventos según el filtro (semana, mes, año)
                let diff = filter == "Week"
                    ? (0, date_fns_1.differenceInCalendarISOWeeks)(eventDate, eventDate2)
                    : filter == "Month"
                        ? this.differenceInCalendarMonths(eventDate, eventDate2) +
                            (0, date_fns_1.differenceInCalendarYears)(eventDate, eventDate2)
                        : (0, date_fns_1.differenceInCalendarYears)(eventDate, eventDate2);
                //console.log("date1:", eventDate, "date2:", eventDate2, "diff: ", diff)
                // si la diferencia es 0, quiere decir que los eventos son del mismo periodo, por lo tanto se agregan al subarreglo
                if (diff == 0) {
                    console.log("enter");
                    subarray.push(events2[j]);
                    events2.splice(j, 1);
                    j--;
                }
            }
            // una vez que se recorrió el arreglo de eventos, se agrega el subarreglo al arreglo de eventos filtrados
            const period = filter == "Week"
                ? this.weekFilter(eventDate)
                : filter == "Month"
                    ? this.monthFilter(eventDate)
                    : this.yearFilter(eventDate); //se obtiene el periodo del subarreglo
            const index = filter == "Week"
                ? (0, date_fns_1.getISOWeek)(eventDate) +
                    ((0, date_fns_1.getYear)(eventDate) - (0, date_fns_1.getYear)(new Date())) * 52
                : filter == "Month"
                    ? (0, date_fns_1.getMonth)(eventDate) +
                        ((0, date_fns_1.getYear)(eventDate) - (0, date_fns_1.getYear)(new Date())) * 12
                    : (0, date_fns_1.getYear)(eventDate); //se obtiene el índice para ordenar el arreglo de eventos filtrados
            filteredEvents.push({ period: period, events: subarray, index: index });
            subarray = []; //se vacía el subarreglo para la siguiente vuelta
        }
        return filteredEvents;
    }
    /*
      DIFFERENCE IN CALENDAR WEEKS
      Gets the difference in calendar weeks between two dates
      PARAMS:
          - date1: first date
          - date2: second date
      RETURNS:
          - diff: difference in calendar weeks
      */
    differenceInCalendarMonths(date1, date2) {
        let diff = Math.abs((0, date_fns_1.getMonth)(date1) - (0, date_fns_1.getMonth)(date2));
        return diff;
    }
    /*
      DIFFERENCE IN CALENDAR YEARS
      Gets the difference in calendar years between two dates
      PARAMS:
          - date1: first date
          - date2: second date
      RETURNS:
          - diff: difference in calendar years
      */
    differenceInCalendarYears(date1, date2) {
        let diff = Math.abs((0, date_fns_1.getYear)(date1) - (0, date_fns_1.getYear)(date2));
        return diff;
    }
    /*
      FILTERS ------------------------------------------------------------------
      */
    /*
      WEEK FILTER
      Gets the week of the date
      PARAMS:
          - date: date to get the week
      RETURNS:
          - week: week of the date
      */
    weekFilter(date_) {
        //const date_ = parseISO(date);
        return ((0, date_fns_1.startOfISOWeek)(date_) + "to " + (0, date_fns_1.endOfWeek)(date_, { weekStartsOn: 1 }));
    }
    /*
      MONTH FILTER
      Gets the month of the date
      PARAMS:
          - date: date to get the month
      RETURNS:
          - month: month of the date
      */
    monthFilter(date_) {
        //const date_ = parseISO(date);
        let mes = "";
        switch ((0, date_fns_1.getMonth)(date_)) {
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
        return mes + " de " + (0, date_fns_1.getYear)(date_);
    }
    /*
      YEAR FILTER
      Gets the year of the date
      PARAMS:
          - date: date to get the year
      RETURNS:
          - year: year of the date
      */
    yearFilter(date_) {
        //const date_ = parseISO(date);
        return (0, date_fns_1.getYear)(date_);
    }
    /*
      SORT EVENTS
      Sorts the events by index
      PARAMS:
          - events: array that contains all the events
      RETURNS:
          - sortedEvents: array that contains the sorted events
      */
    sortEvents(events) {
        // merge sort based on the index attribute of the events
        return this.divide(events);
    }
    /*
      MERGE SORT: divide
      Divides the array in two
      PARAMS:
          - items: array that contains all the events
      RETURNS:
          - combined: array that contains the sorted events
      */
    divide(items) {
        var halfLength = Math.ceil(items.length / 2);
        var low = items.slice(0, halfLength);
        var high = items.slice(halfLength);
        if (halfLength > 1) {
            low = this.divide(low);
            high = this.divide(high);
        }
        return this.combine(low, high);
    }
    /*
      MERGE SORT: combine
      Combines the two arrays
      PARAMS:
          - low: first array
          - high: second array
      RETURNS:
          - combined: array that contains the sorted events
      */
    combine(low, high) {
        var indexLow = 0;
        var indexHigh = 0;
        var lengthLow = low.length;
        var lengthHigh = high.length;
        var combined = [];
        while (indexLow < lengthLow || indexHigh < lengthHigh) {
            var lowItem = low[indexLow];
            var highItem = high[indexHigh];
            if (lowItem !== undefined) {
                if (highItem === undefined) {
                    combined.push(lowItem);
                    indexLow++;
                }
                else {
                    if (lowItem.index <= highItem.index) {
                        combined.push(lowItem);
                        indexLow++;
                    }
                    else {
                        combined.push(highItem);
                        indexHigh++;
                    }
                }
            }
            else {
                if (highItem !== undefined) {
                    combined.push(highItem);
                    indexHigh++;
                }
            }
        }
        return combined;
    }
    /*
      MAIN FILTER FUNCTION
      Filters the calendar by week, day or month
      PARAMS:
          -object: is the request body that contains the filter
      RETURNS:
          - sortedFilteredEvents: array that contains the sorted and filtered events
      */
    filterCalendar(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                let events = yield collection.find().toArray();
                //let events2 = events;
                let filter = object.filter;
                let filteredEvents = this.filterEvents(filter, events);
                let sortedFilteredEvents = this.sortEvents(filteredEvents);
                console.log("sortedFilteredEvents: ", sortedFilteredEvents);
                return sortedFilteredEvents;
            }
            catch (err) {
                console.log("Error al filtrar el calendario: ", err);
            }
        });
    }
    /*
      VERRIFY OVERLAP
      Verifies if there is an overlap between events
      PARAMS:
          -object: is the request body that contains the event to verify
      RETURNS:
          - true if there is an overlap
          - false if there is not an overlap
      */
    verifyOverlap(object) {
        return __awaiter(this, void 0, void 0, function* () {
            //logica
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.CALENDAR_COLLECTION);
                const Event = mongoose_1.default.model("Event", Schemas_1.EventSchema);
                let theEvent = new Event({
                    startTime: new Date(object.startTime),
                    endTime: new Date(object.endTime),
                });
                let events = yield collection.find().toArray();
                for (let i = 0; i < events.length; i++) {
                    const thisEventRange = {
                        startTime: new Date(events[i].startTime),
                        endTime: new Date(events[i].endTime),
                    };
                    if (object._id == events[i]._id &&
                        theEvent.startTime.getTime() == thisEventRange.startTime.getTime() &&
                        theEvent.endTime.getTime() == thisEventRange.endTime.getTime()) {
                        break;
                    }
                    //verify if the event is in the range of the other event
                    if (thisEventRange.startTime < theEvent.startTime &&
                        theEvent.startTime < thisEventRange.endTime) {
                        console.log("Hay superposición de eventos");
                        return true;
                    }
                    else if (theEvent.startTime < thisEventRange.endTime &&
                        thisEventRange.endTime < theEvent.endTime) {
                        console.log("Hay superposición de eventos");
                        return true;
                    }
                    else if (theEvent.startTime.getTime() == thisEventRange.startTime.getTime() &&
                        theEvent.endTime.getTime() == thisEventRange.endTime.getTime()) {
                        console.log("Hay superposición de eventos");
                        return true;
                    }
                }
                return false;
            }
            catch (err) {
                console.log("Error al verificar la superposición de eventos: ", err);
            }
        });
    }
    /*
      CREATE EVENT
      Creates an event with the decorator
      PARAMS:
          - None
      RETURNS:
          - event: event created
      */
    createEvent() {
        const event = new event_1.Event();
        return event;
    }
}
exports.DAOCalendar = DAOCalendar;
