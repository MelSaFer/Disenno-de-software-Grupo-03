import { API_URL } from "../config";
import { DTOUser } from "../DTO/DTOUser";
import { DAOUser } from "../DAO/DAOUser";
import { DAOPurchase } from "../DAO/DAOPurchase";
import { Subject } from "../Observer/Subject";
import { Observer } from "../Observer/Observer";
import { NotificationCenter } from "./NotificationCenter";

export class AdminUser implements Subject{
  private observers: Observer[] = [];
  constructor() {
    this.observers[0] = new NotificationCenter();
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  notify(body: any): void {
    for (const observer of this.observers) observer.update(this, body);
  }

  /*
    METHOD ADD USER
    PARAMS: userId, email, roleType, cart
    */
  addUser(object: any) {
    try {
      const daoUser = new DAOUser();
      const user = daoUser.create(object);
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }

  getInfoUser(id: number) {
    try {
      const daoUser = new DAOUser();
      const user = daoUser.getObject(id);
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }

  /*
    METHOD UPDATE CART
    PARAMS: userId, productId, quantity
    */
  updateCart(userId: number, productId: number, quantity: number) {
    try {
      const daoUser = new DAOUser();
      const user = daoUser.updateCart(userId, productId, quantity);
      return user;
    } catch (error) {
      console.log("Error", error);
    }
  }

  /*
    METHOD GET CART
    PARAMS: userId
    */
  getCart(userId: number) {
    try {
      const daoUser = new DAOUser();
      const cart = daoUser.getCart(userId);
      return cart;
    } catch (error) {
      console.log("Error", error);
    }
  }

  /*
    METHOD GET PURCHASE HISTORY
    PARAMS: userId
    */
  getPurchaseHistory(userId: number) {
    try {
      const daoUser = new DAOUser();
      const purchasehistory = daoUser.getPurchaseHistory(userId);
      return purchasehistory;
    } catch (error) {
      console.log("Error", error);
    }
  }

  /*
    METHOD UPDATE STATE PURCHASE HISTORY
    PARAMS: userId, purchaseId, state
    */
  async updatePurchaseState(userId: number, purchaseId: number, state: string) {
    try {
      const daoPurchase = new DAOPurchase();
      const purchase = await daoPurchase.updatePurchaseState(
        userId,
        purchaseId,
        state
      );

      // Notificar a los observadores
      if (purchase == state && state == "ACCEPTED"){
        this.notify({ userId: userId, purchaseId: purchaseId});
      }
      
      return purchase;
    } catch (error) {
      console.log("Error", error);
    }
  }

  /*
    METHOD MAKE PURCHASE
    PARAMS: userId, purchaseId, state
    */
  makePurchase(object: any) {
    try {
      const daoPurchase = new DAOPurchase();
      const purchase = daoPurchase.create(object);
      return purchase;
    } catch (error) {
      console.log("Error", error);
    }
  }

  /*
    METHOD GET NOTIFICATIONS
    PARAMS: userId
    */
  getNotifications(userId: number) {
    try {
      const daoUser = new DAOUser();
      const notifications = daoUser.getNotifications(userId);
      return notifications;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async getAllUsers(){
    try {
      const daoUser = new DAOUser();
      const users = await daoUser.getAll();
      return users;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async updateNotificationState(userId: number){
    try {
      const daoUser = new DAOUser();
      const notification = await daoUser.updateNotificationState(userId);
      return notification;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async isUnread(userId: number){
    try {
      const daoUser = new DAOUser();
      const unread = await daoUser.isUnread(userId);
      return unread;
    } catch (error) {
      console.log("Error", error);
    }
  }

  async addNotification(notification_: any){
    try {
      const daoUser = new DAOUser();
      const notification = await daoUser.addNotification(notification_);
      return notification;
    } catch (error) {
      console.log("Error", error);
    }
  }
  
}
