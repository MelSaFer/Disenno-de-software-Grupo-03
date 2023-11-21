
import app from "./app";
//import { PORT } from "./Controler/config";
import { MakeupEvent } from "./Controler/Decorator/makeupEvent";
import { DeliveryEvent } from "./Controler/Decorator/deliveryEvent";
import {Event} from "./Controler/Decorator/event";


//require("dotenv").config();




async function main() {
  

  //app.listen(PORT);
  //console.log("Server on port ", PORT);

  //const decorator1 = new ConcreteDecoratorA(simple);
  //const decorator2 = new ConcreteDecoratorB(decorator1);
  const eventId = "jjksks";
  const userId = "jisjkjjdjd";
  const description = "Reunión de equipo";
  const startTime = new Date("2023-11-17T09:00:00");
  const endTime = new Date("2023-11-17T10:30:00");
  const date = new Date("2023-11-17");
  console.log("Probando Decorator")
  const e = new Event(eventId, userId, description, startTime, endTime, date);
  const m = new MakeupEvent(e);
  const d = new DeliveryEvent(e);
  //console.log(m.schedule());
  //console.log(d.schedule());

  interface RangoHora {
    inicio: Date;
    fin: Date;
  }
  
  function hayOverlap(rango1: RangoHora, rango2: RangoHora): boolean {
    return rango1.inicio <= rango2.fin && rango1.fin >= rango2.inicio;
  }
  // Ejemplo de uso:
  const rango1: RangoHora = {
    inicio: new Date('2023-11-20T08:00:00'),
    fin: new Date('2023-11-20T12:00:00'),
  };

  const rango2: RangoHora = {
    inicio: new Date('2023-11-20T10:00:00'),
    fin: new Date('2023-11-20T14:00:00'),
  };

  if (hayOverlap(rango1, rango2)) {
    console.log('¡Hay overlap entre los rangos de horas!');
  } else {
    console.log('No hay overlap entre los rangos de horas.');
  }

    
  //console.log(dao.create(daoUser));
}

main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))