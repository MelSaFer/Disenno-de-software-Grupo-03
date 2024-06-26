import { DAO } from "./DAO"
import { PurchaseSchema } from "./schemas/Schemas"
import mongoose from "mongoose";
import { SingletonMongo } from "../Singleton/SingletonMongo";
import { ACCEPTED_STATE, DECLINED_STATE, PENDING_STATE, DATABASE_NAME, PURCHASE_COLLECTION } from "../config";
import { User } from "../../Model/User";
import { DAOProduct } from "./DAOProduct";
import { DAOUser } from "./DAOUser";
import {ShippingDays} from "./ShippingDays";
import { getDay } from "date-fns";
import { Event } from "../Decorator/event";
import { DeliveryEvent } from "../Decorator/deliveryEvent";
import { DAOCalendar } from "./DAOCalendar";
import { user } from "firebase-functions/v1/auth";
import { SHIPPING_PRICE } from "../config";
import { EVENT_TYPE } from "../Decorator/EVENT_TYPE";
import { da } from "date-fns/locale";

/*-----------------------------------------------------------------------
DAO PURCHASE
 Class for managing the connection to the database and the queries related
 to the purchase

PURCHASE ATTRIBUTES::
    - purchaseId: number
    - purchaseDetails: string
    - products: array
    - voucherId: string   -> Image id of the voucher
    - aproxDeliveryDate: date
    - shippingAdress: string
    - shippingPrice: number
    - userId: number
    - state: string

 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOPurchase implements DAO {

    constructor() { };

    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the purchasehistories in the database
    PARAMS:
        - none
    RETURNS:
        - purchasehistories: array of purchasehistories
        - error 
    */
    async getAll() {
        try {
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);

            //Get the purchasehistories from the database, using the code
            let purchase = await collection.find({}).toArray();
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            if (purchase) {
                //console.log("Se encontraron los carritos: " + JSON.stringify(purchasehistories, null, 2));
                return purchase;
            }
            else {
                return { "name": "No se encontraron compras" };
            }
        } catch (error) {
            //console.log(error);
            return { "name": "No se encontraron compras" };
        }
    };

    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a purchase  in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - purchase  if the purchase  was found
        - error message if the purchase was not found
    */
    async getObject(purchaseId_: unknown) {
        try {
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);
            //Get the Purchase from the database, using the code
            // @ts-expect-error
            const purchase = await collection.findOne({ _id: purchaseId_ });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the product history was found, return it, else return error message
            if (purchase) {
                //console.log("Se encontró: " + JSON.stringify(purchase, null, 2));
                return purchase;
            } else {
                //console.log("No se encontró el historial con el código: " + purchaseId_);
                return { "name": "No se encontró la compra" };
            }
        } catch (err) {
            //console.log(err);
            return { "name": "No se encontró la compra" };
        }
    };

    /*
   -----------------------------------------------------------------------
   CREATE METHOD
   Create a purchase in the database
   PARAMS:
       - object: Product History
   RETURNS:
       - ok message if the purchase was created
       - error message if the purchase was not created
   */
    async create(object: any) {
        try {
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);
            const Purchase = mongoose.model('Purchase', PurchaseSchema);

            //Create a new purchase with the object received
            let newPurchase = new Purchase({
                purchaseDetails: object.purchaseDetails,
                products: object.products,
                voucherId: object.voucherId,
                aproxDeliveryDate: object.aproxDeliveryDate,
                shippingAddress: this.calculateShippingPrice(/*object.products*/),
                shippingPrice: object.shippingPrice,
                userId: object.userId,
                state: object.state
            });

            //Reduce the stock of the products in the purchase
            const arrayProducts = object.products;
            const daoProduct = new DAOProduct();
            for (let i = 0; i < arrayProducts.length; i++) {
                let product = await daoProduct.getObject(arrayProducts[i].productId);
                console.log("product: " + JSON.stringify(product, null, 2));
                //Verify existence of the product
                if (!product || !('cuantityAvailable' in product)) {
                    return { "name": "El producto " + arrayProducts[i].productId + " no existe" };
                }
                //Verify there's enough stock
                if (product.cuantityAvailable < arrayProducts[i].quantity) {
                    return { "name": "No hay stock suficiente del producto " + product.name };
                }
                product.cuantityAvailable = product.cuantityAvailable - arrayProducts[i].quantity;
                await daoProduct.update(product);
            }


            //Insert the purchase in the database, convert it to JSON and parse it
            const newPurchaseJson = JSON.stringify(newPurchase);
            const newPurchaseParsed = JSON.parse(newPurchaseJson);
            await collection.insertOne(newPurchaseParsed);


            //Empty user cart
            const daoUser = new DAOUser();
            const user = await daoUser.getObject(object.userId);
            user.cart = [];
            await daoUser.update(user);

            //console.log("Se insertó: " + newPurchaseJson);
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return { "name": "Se insertó la compra" };

        } catch (err) {
            //console.log(err);
            return { "name": "No se insertó la compra u ocurrió otro error" };
        }
    };

    /*
    -----------------------------------------------------------------------
    CALCULATE SHIPPING PRICE
    Calculate the shipping price of a purchase
    PARAMS:
        - products : array
    RETURNS:
        - shippingPrice: number
    */
    calculateShippingPrice(/*products: any*/) {
        let shippingPrice = SHIPPING_PRICE;
        // for (let i = 0; i < products.length; i++) {
        //     shippingPrice = shippingPrice + products[i].quantity * products[i].price;
        // }
        return shippingPrice;
    }


    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a purchase in the database
    PARAMS:
        - object: unknown
    RETURNS:
        - ok message if the purchase was updated
        - error message if the purchase was not updated
    */
    async update(object: any) {
        //Si voy a agregar algo al purchase, me pego a mongo y lo agrego
        //no lo agrege porque creo que se plantea diferente al resto
        try {
            const purchase = mongoose.model('Purchase', PurchaseSchema);
            const result = await purchase.updateOne(object);
        } catch (err) {
            console.log(err);
        }
        return { "name": "No se actualizó la compra" };
    };

    /*
    -----------------------------------------------------------------------
    UPDATE STATE METHOD
    Update a purchase  in the database
    PARAMS:
        - object: unknown
    RETURNS:
        - ok message if the purchase was updated
        - error message if the purchase was not updated
    */
    async updatePurchaseState(userId_: number, purchaseId_: any, state_: string, location_: string) {
        try {
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);

            //Verify existence of the product history
            const purchase = await collection.findOne({ _id: purchaseId_, userId: userId_ });
            if (!purchase) {
                return { "name": "La compra no existe" };
            }

            /* if(purchase.state != PENDING_STATE ){
                return { "name": "El estado no se puede modificar" };
            } */

            //If state is REJECTED, return the stock of the products
            if (state_ == DECLINED_STATE) {
                const arrayProducts = purchase.products;
                const daoProduct = new DAOProduct();
                for (let i = 0; i < arrayProducts.length; i++) {
                    let product = await daoProduct.getObject(arrayProducts[i].productId);
                    //Verify existence of the product
                    if (!product || !('cuantityAvailable' in product)) {
                        return { "name": "El producto " + arrayProducts[i].productId + " no existe" };
                    }
                    product.cuantityAvailable = product.cuantityAvailable + arrayProducts[i].quantity;
                    await daoProduct.update(product);
                }
            } else if (state_ == ACCEPTED_STATE) {
                //If state is ACCEPTED, set the aprox delivery date
                purchase.aproxDeliveryDate = this.setAproxDeliveryDate();
                console.log("aproxDeliveryDate: " + purchase.aproxDeliveryDate);

                //CREATES THE EVENT
                //const newEvent = Event()

                const daoCalendar = new DAOCalendar();
                
                let newEvent = daoCalendar.createEvent();
                newEvent.setUserId(userId_.toString());
                newEvent.setDescription("Delivery of purchase " + purchaseId_);
                newEvent.setDate(purchase.aproxDeliveryDate);
                newEvent.setEventId(purchaseId_.toString());
                newEvent.setLocation(location_);

                //newEvent = new DeliveryEvent(newEvent);
                let theEvent = new DeliveryEvent(newEvent);

                console.log("theEvent: " + theEvent.schedule(EVENT_TYPE.DELIVERY));
                console.log("the NEW Event: " + JSON.stringify(newEvent, null, 2));

                //Insert the purchase in the database, convert it to JSON and parse it
                const newEventJson = JSON.stringify(newEvent);
                const newEventParsed = JSON.parse(newEventJson);
                daoCalendar.create(newEventParsed);

                
            }
            //Create the update object for updating the content
            const InfoToUpdate = {
                $set: {
                    state: state_,
                    aproxDeliveryDate: purchase.aproxDeliveryDate
                    }
            };

            //Update the product in the database
            const result = await collection.updateOne({ _id: purchaseId_ }, InfoToUpdate );

            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the product was updated
            if (result.modifiedCount > 0) {
                //console.log("La compra se actualizó con éxito");
                //return {"name": "La compra se actualizó con éxito"};
                //return theEvent
                return { "name": state_ }
                //return state_;
            } else {
                return { "name": "No se encontró la compra a actualizar" };
            }
        } catch (err) {
            return { "name": "No se actualizó la compra" };
        }
    };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a purchase in the database
    PARAMS:
        - object: unknown
    RETURNS:
        - ok message if the purchase  was deleted
        - error message if the purchase  was not deleted
    */
    async delete(purchaseId_: unknown) {
        try {
            console.log("code: " + purchaseId_);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);

            //Verify existence of the product history
            const product = await collection.findOne({ purchaseId: purchaseId_ });
            if (!product) {
                //console.log("El producto " +  purchaseId_ + " no existe");
                return { "name": "El producto no existe" };
            }
            //Delete the product in the database
            const result = await collection.deleteOne({ purchaseId: purchaseId_ });

            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the product was deleted
            if (result.deletedCount > 0) {
                return { "name": "La compra se eliminó con éxito" };
            } else {
                return { "name": "No se encontró la compra a eliminar" };
            }

        } catch (err) {
            return { "name": "No se eliminó la compra" };
        }
    };

    private setAproxDeliveryDate() {

        let currentDate = new Date();
        //Obtains the days until the next shipping date of every option
        let ShippingDay1 = this.getDaysUntilShippingDate(ShippingDays.Day1, currentDate);
        let ShippingDay2 = this.getDaysUntilShippingDate(ShippingDays.Day2, currentDate);
        let ShippingDay3 = this.getDaysUntilShippingDate(ShippingDays.Day3, currentDate);
        let bestShippingDay = 0;

        //if the best shipping day is today, it sets the aprox delivery date to the next delivery day
        if(ShippingDay1 == 0){  //special case 1 = Today is a shipping day
            bestShippingDay =ShippingDay2;
        }else if(ShippingDay2 == 0){ //special case 1 = Today is a shipping day
            bestShippingDay = ShippingDay3;
        } else if(ShippingDay3 == 0){ //special case 1 = Today is a shipping day
            bestShippingDay = ShippingDay1;
        //GENERAL CASES
        } else if(ShippingDay1 < ShippingDay2 && ShippingDay1 < ShippingDay3 && currentDate){
            bestShippingDay = ShippingDay1;
        }else if(ShippingDay2<ShippingDay1 && ShippingDay2<ShippingDay3){
            bestShippingDay = ShippingDay2;
        } else{
            bestShippingDay = ShippingDay3;
        }

        
        //sets the aprox delivery date
        currentDate.setDate(currentDate.getDate() + bestShippingDay);

        return currentDate;
    }

    /*
    -----------------------------------------------------------------------
    GET NEXT SHIPPING DATE METHOD
    params: 
        dayOfWeek=
                1: Monday (Lunes) 
                2: Tuesday (Martes) 
                3: Wednesday (Miércoles) 
                4: Thursday (Jueves) 
                5: Friday (Viernes) 
                6: Saturday (Sábado) 
                0: Sunday (Domingo)
        currentDate: Date
    returns: daysUntilShippingDate: number
     */
    getDaysUntilShippingDate(dayOfWeek: number, currentDate: Date) {
        let daysUntilShippingDate = (dayOfWeek - currentDate.getDay() + 7) % 7;
        console.log("daysUntilShippingDate: " + dayOfWeek + " " + daysUntilShippingDate);
        return daysUntilShippingDate;
    }

    
}
