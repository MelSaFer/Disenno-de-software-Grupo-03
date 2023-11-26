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
const app_1 = __importDefault(require("./app"));
const config_1 = require("./Controler/config");
require("dotenv").config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app_1.default.listen(config_1.PORT);
        console.log("Server on port ", config_1.PORT);
        //const decorator1 = new ConcreteDecoratorA(simple);
        //const decorator2 = new ConcreteDecoratorB(decorator1);
        const eventId = "jjksks";
        const userId = "jisjkjjdjd";
        const description = "Reunión de equipo";
        const startTime = new Date("2023-11-17T09:00:00");
        const endTime = new Date("2023-11-17T10:30:00");
        const date = new Date("2023-11-17");
        console.log("Probando Decorator");
        //const e = new Event(eventId, userId, description, startTime, endTime, date);
        //const m = new MakeupEvent(e);
        //const d = new DeliveryEvent(e);
        //console.log(m.schedule());
        //console.log(d.schedule());
        const fechaActual = new Date("12/12/2023");
        // Opción 1: Obtén el nombre del día de la semana en español
        const nombreDiaSemana = fechaActual.toLocaleDateString('es-ES', { weekday: 'long' });
        // Opción 2: Obtén el nombre del día de la semana en el idioma del navegador
        //const nombreDiaSemana = fechaActual.toLocaleDateString(undefined, { weekday: 'long' });
        // Imprime el resultado
        console.log('Hoy es ' + nombreDiaSemana);
        // Obtén la fecha actual
        let currentDate = new Date();
        let daysUntilShippingDate = (6 - currentDate.getDay() + 7) % 7;
        console.log(currentDate.setDate(currentDate.getDate() + daysUntilShippingDate));
        console.log(currentDate);
        //console.log(dao.create(daoUser));
    });
}
main();
// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))
