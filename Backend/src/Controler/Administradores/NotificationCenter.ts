import { DAOUser } from "../DAO/DAOUser";
import { Observer } from "../Observer/Observer";
import { AdminUser } from "./AdminUser";
import { AdminCalendar } from "./AdminCalendar";
import { DAOPurchase } from "../DAO/DAOPurchase";
import { ADMIN_ID, DECLINEDDELIVERY_NOTIF, DECLINED_STATE, DELIVERY_NOTIF, MAKEUP_NOTIF } from "../config";
import { EVENT_TYPE } from "../Decorator/EVENT_TYPE";

export class NotificationCenter implements Observer {
    async update(observable: any, body: any) {
        try {
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

                // Agregar id de compra
                Object.assign(notification, {purchaseId: body.purchaseId}); 

                if (body.state == DECLINED_STATE) {
                    Object.assign(notification, {notificationType: DECLINEDDELIVERY_NOTIF});
                    
                }
                else {
                    Object.assign(notification, {notificationType: DELIVERY_NOTIF});

                    // Agregar fecha de entrega
                    const purchase: any = await daoPurchase.getObject(body.purchaseId);
                    Object.assign(notification, {deliveryDate: purchase.aproxDeliveryDate}); 

                    // crear notificacion para el administrador
                    const adminNotification = {
                        "userId": ADMIN_ID,
                        "notificationTime": notification.notificationTime,
                        "notificationDate": notification.notificationDate,
                        "state": false,
                        "notificationType": DELIVERY_NOTIF,
                        "purchaseId": body.purchaseId,
                        "deliveryDate": purchase.aproxDeliveryDate
                    }
                    userDAO.addNotification(adminNotification);
                }
                
            }
            // else{
            //     Object.assign(notification, {notificationType:  MAKEUP_NOTIF});
            //     Object.assign(notification, {deliveryDate: body.deliveryDate}); // Agregar fecha del makeup
            // }

            // Agregar notificacion al usuario en la base de datos 
            const response = userDAO.addNotification(notification);
            //console.log('Notification Center: ', observable);
        } catch (error) {
            console.log("Error", error);
        }
    }
}