import { API_URL } from '../config';
import { DAOCalendar } from '../DAO/DAOCalendar';
import { Observer } from '../Observer/Observer';
import { Subject } from '../Observer/Subject';
import { NotificationCenter } from './NotificationCenter';


export class AdminCalendar implements Subject{
    private observers: Observer[] = [];
    calendar = [];

    constructor(){
        this.observers[0] = new NotificationCenter();
    }

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if(index > -1){
            this.observers.splice(index, 1);
        }
    }

    notify(body: any): void {
        for(const observer of this.observers){
            observer.update(this, body);
        }
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
            if(result == "Makeup"){
                this.notify({userId: object.userId, purchaseId: object.purchaseId});
            }
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

    async verifyOverlap(object: any){
        try{
            const daoCalendar = new DAOCalendar();
            const result = await daoCalendar.verifyOverlap(object);
            return result;
        }   catch(err){
            console.log("Error al verificar la superposicion de eventos", err);
        }
    }
}