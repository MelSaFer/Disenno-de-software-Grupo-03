import { DAOUser } from "../DAO/DAOUser";
import { Observer } from "../Observer/Observer";
import { AdminUser } from "./AdminUser";
import { AdminCalendar } from "./AdminCalendar";
import { DAOPurchase } from "../DAO/DAOPurchase";

export class NotificationCenter implements Observer {
    async update(observable: any, body: any) {
        // Crear DAOs necesarias
        const userDAO = new DAOUser();
        const daoPurchase = new DAOPurchase();

        // Crear notificacion
        let notification =  {
                                "userId": body.userId,
                                "notificationTime": new Date(),
                                "notificationDate": new Date(),
                                "state": false
                                }

        // Asignar tipo de notificacion segun el observable
        if (observable.constructor.name == AdminUser.name) {
            Object.assign(notification, {notificationType:  "Delivery"});
            Object.assign(notification, {purchaseId: body.purchaseId}); // Agregar id de compra

            const purchase: any = await daoPurchase.getObject(body.purchaseId);
            //console.log('Purchase: ', purchase);
            Object.assign(notification, {deliveryDate: purchase.aproxDeliveryDate}); // Agregar fecha de entrega
        }
        else{
            Object.assign(notification, {notificationType:  "Makeup"});
            Object.assign(notification, {deliveryDate: body.deliveryDate}); // Agregar fecha del makeup
        }

        // Agregar notificacion al usuario en la base de datos 
        const response = userDAO.addNotification(notification);
        //console.log('Notification Center: ', observable);
    }
}