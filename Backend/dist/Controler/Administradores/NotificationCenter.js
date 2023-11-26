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
exports.NotificationCenter = void 0;
const DAOUser_1 = require("../DAO/DAOUser");
const AdminUser_1 = require("./AdminUser");
const DAOPurchase_1 = require("../DAO/DAOPurchase");
const config_1 = require("../config");
class NotificationCenter {
    update(observable, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Crear DAOs necesarias
                const userDAO = new DAOUser_1.DAOUser();
                const daoPurchase = new DAOPurchase_1.DAOPurchase();
                // Crear notificacion
                let notification = {
                    "userId": body.userId,
                    "notificationTime": new Date(),
                    "notificationDate": new Date(),
                    "state": false
                };
                // Asignar tipo de notificacion segun el observable
                if (observable.constructor.name == AdminUser_1.AdminUser.name) {
                    // Agregar id de compra
                    Object.assign(notification, { purchaseId: body.purchaseId });
                    if (body.state == config_1.DECLINED_STATE) {
                        Object.assign(notification, { notificationType: config_1.DECLINEDDELIVERY_NOTIF });
                    }
                    else {
                        Object.assign(notification, { notificationType: config_1.DELIVERY_NOTIF });
                        // Agregar fecha de entrega
                        const purchase = yield daoPurchase.getObject(body.purchaseId);
                        Object.assign(notification, { deliveryDate: purchase.aproxDeliveryDate });
                        // crear notificacion para el administrador
                        const adminNotification = {
                            "userId": config_1.ADMIN_ID,
                            "notificationTime": notification.notificationTime,
                            "notificationDate": notification.notificationDate,
                            "state": false,
                            "notificationType": config_1.DELIVERY_NOTIF,
                            "purchaseId": body.purchaseId,
                            "deliveryDate": purchase.aproxDeliveryDate
                        };
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
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
}
exports.NotificationCenter = NotificationCenter;
