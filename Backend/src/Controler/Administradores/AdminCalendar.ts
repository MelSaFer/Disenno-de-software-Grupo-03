import { API_URL } from '../config';
import { DAOCalendar } from '../DAO/DAOCalendar';


export class AdminCalendar{
    calendar = [];

    constructor(){
        this.calendar = [];
    }

    async getCalendar(){
        try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.getAll();
            return result;
        }catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    async filterCalendar(object: any){
        try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.filterCalendar(object);
            return result;
        }catch(err){
            console.log("Error al cargar el calendario", err);
        }
    }

    async createEvent(object: any){
        try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.create(object);
            return result;
        } catch(err){
            console.log("Error al crear el evento", err);
        }
    }

    async getEvent(object: any){
        try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.getObject(object);
            return result;
        }   catch(err){
            console.log("Error al obtener el evento", err);
        }
    }

    async updateEvent(object: any){
       try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.update(object);
            return result;
        }   catch(err){
            console.log("Error al actualizar el evento", err);
        }
    }

    async deleteEvent(object: any){
        try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.delete(object);
            return result;
        }   catch(err){
            console.log("Error al eliminar el evento", err);
        }
    }
}