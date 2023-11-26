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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCalendar = void 0;
const DAOCalendar_1 = require("../DAO/DAOCalendar");
const NotificationCenter_1 = require("./NotificationCenter");
class AdminCalendar {
    constructor() {
        this.observers = [];
        this.calendar = [];
        this.observers[0] = new NotificationCenter_1.NotificationCenter();
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    notify(body) {
        for (const observer of this.observers) {
            observer.update(this, body);
        }
    }
    getCalendar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                const result = yield daoCalendar.getAll();
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    filterCalendar(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                const result = yield daoCalendar.filterCalendar(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    createEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                console.log("object", object);
                const result = yield daoCalendar.create(object);
                // Send notification to users
                // if(result == EVENT_TYPE.MAKEUP){
                //     this.notify({userId: object.userId, purchaseId: object.purchaseId, deliveryDate: object.date});
                // }
                return result;
            }
            catch (err) {
                console.log("Error al crear el evento", err);
            }
        });
    }
    getEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                const result = yield daoCalendar.getObject(object);
                return result;
            }
            catch (err) {
                console.log("Error al obtener el evento", err);
            }
        });
    }
    updateEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                const result = yield daoCalendar.update(object);
                return result;
            }
            catch (err) {
                console.log("Error al actualizar el evento", err);
            }
        });
    }
    deleteEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                const result = yield daoCalendar.delete(object);
                return result;
            }
            catch (err) {
                console.log("Error al eliminar el evento", err);
            }
        });
    }
    verifyOverlap(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCalendar = new DAOCalendar_1.DAOCalendar();
                const result = yield daoCalendar.verifyOverlap(object);
                return result;
            }
            catch (err) {
                console.log("Error al verificar la superposicion de eventos", err);
            }
        });
    }
}
exports.AdminCalendar = AdminCalendar;
