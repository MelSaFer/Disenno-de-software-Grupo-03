import { DAOUser } from "../DAO/DAOUser";
import { Observer } from "../Observer/Observer";
import { AdminUser } from "./AdminUser";
import { AdminCalendar } from "./AdminCalendar";

export class NotificationCenter implements Observer {
    update(observable: any, body: any) {
        //Crear notificacion
        const userDAO = new DAOUser();
        let notification =  {
                                "userId": body.userId,
                                "notificationTime": new Date(),
                                "notificationDate": new Date(),
                                //"deliveryDate": body.deliveryTime
                                "state": false
                                }

        if (observable.constructor.name == AdminUser.name) {
            Object.assign(notification, {notificationType:  "Delivery"});
            Object.assign(notification, {purchaseId: body.purchaseId});
        }
        else{
            Object.assign(notification, {notificationType:  "Makeup"});
        }

        const response = userDAO.addNotification(notification);
        console.log('Notification Center: ', observable);
    }
}