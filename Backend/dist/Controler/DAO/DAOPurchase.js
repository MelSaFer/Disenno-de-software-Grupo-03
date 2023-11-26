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
exports.DAOPurchase = void 0;
const Schemas_1 = require("./schemas/Schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const SingletonMongo_1 = require("../Singleton/SingletonMongo");
const config_1 = require("../config");
const DAOProduct_1 = require("./DAOProduct");
const DAOUser_1 = require("./DAOUser");
const ShippingDays_1 = require("./ShippingDays");
const deliveryEvent_1 = require("../Decorator/deliveryEvent");
const DAOCalendar_1 = require("./DAOCalendar");
const config_2 = require("../config");
const EVENT_TYPE_1 = require("../Decorator/EVENT_TYPE");
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
class DAOPurchase {
    constructor() { }
    ;
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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PURCHASE_COLLECTION);
                //Get the purchasehistories from the database, using the code
                let purchase = yield collection.find({}).toArray();
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                if (purchase) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(purchasehistories, null, 2));
                    return purchase;
                }
                else {
                    return { "name": "No se encontraron compras" };
                }
            }
            catch (error) {
                //console.log(error);
                return { "name": "No se encontraron compras" };
            }
        });
    }
    ;
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
    getObject(purchaseId_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PURCHASE_COLLECTION);
                //Get the Purchase from the database, using the code
                // @ts-expect-error
                const purchase = yield collection.findOne({ _id: purchaseId_ });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                // If the product history was found, return it, else return error message
                if (purchase) {
                    //console.log("Se encontró: " + JSON.stringify(purchase, null, 2));
                    return purchase;
                }
                else {
                    //console.log("No se encontró el historial con el código: " + purchaseId_);
                    return { "name": "No se encontró la compra" };
                }
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se encontró la compra" };
            }
        });
    }
    ;
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
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PURCHASE_COLLECTION);
                const Purchase = mongoose_1.default.model('Purchase', Schemas_1.PurchaseSchema);
                //Create a new purchase with the object received
                let newPurchase = new Purchase({
                    purchaseDetails: object.purchaseDetails,
                    products: object.products,
                    voucherId: object.voucherId,
                    aproxDeliveryDate: object.aproxDeliveryDate,
                    shippingAddress: this.calculateShippingPrice( /*object.products*/),
                    shippingPrice: object.shippingPrice,
                    userId: object.userId,
                    state: object.state
                });
                //Reduce the stock of the products in the purchase
                const arrayProducts = object.products;
                const daoProduct = new DAOProduct_1.DAOProduct();
                for (let i = 0; i < arrayProducts.length; i++) {
                    let product = yield daoProduct.getObject(arrayProducts[i].productId);
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
                    yield daoProduct.update(product);
                }
                //Insert the purchase in the database, convert it to JSON and parse it
                const newPurchaseJson = JSON.stringify(newPurchase);
                const newPurchaseParsed = JSON.parse(newPurchaseJson);
                yield collection.insertOne(newPurchaseParsed);
                //Empty user cart
                const daoUser = new DAOUser_1.DAOUser();
                const user = yield daoUser.getObject(object.userId);
                user.cart = [];
                yield daoUser.update(user);
                //console.log("Se insertó: " + newPurchaseJson);
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                return { "name": "Se insertó la compra" };
            }
            catch (err) {
                //console.log(err);
                return { "name": "No se insertó la compra u ocurrió otro error" };
            }
        });
    }
    ;
    /*
    -----------------------------------------------------------------------
    CALCULATE SHIPPING PRICE
    Calculate the shipping price of a purchase
    PARAMS:
        - products : array
    RETURNS:
        - shippingPrice: number
    */
    calculateShippingPrice( /*products: any*/) {
        let shippingPrice = config_2.SHIPPING_PRICE;
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
    update(object) {
        return __awaiter(this, void 0, void 0, function* () {
            //Si voy a agregar algo al purchase, me pego a mongo y lo agrego
            //no lo agrege porque creo que se plantea diferente al resto
            try {
                const purchase = mongoose_1.default.model('Purchase', Schemas_1.PurchaseSchema);
                const result = yield purchase.updateOne(object);
            }
            catch (err) {
                console.log(err);
            }
            return { "name": "No se actualizó la compra" };
        });
    }
    ;
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
    updatePurchaseState(userId_, purchaseId_, state_, location_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PURCHASE_COLLECTION);
                //Verify existence of the product history
                const purchase = yield collection.findOne({ _id: purchaseId_, userId: userId_ });
                if (!purchase) {
                    return { "name": "La compra no existe" };
                }
                /* if(purchase.state != PENDING_STATE ){
                    return { "name": "El estado no se puede modificar" };
                } */
                //If state is REJECTED, return the stock of the products
                if (state_ == config_1.DECLINED_STATE) {
                    const arrayProducts = purchase.products;
                    const daoProduct = new DAOProduct_1.DAOProduct();
                    for (let i = 0; i < arrayProducts.length; i++) {
                        let product = yield daoProduct.getObject(arrayProducts[i].productId);
                        //Verify existence of the product
                        if (!product || !('cuantityAvailable' in product)) {
                            return { "name": "El producto " + arrayProducts[i].productId + " no existe" };
                        }
                        product.cuantityAvailable = product.cuantityAvailable + arrayProducts[i].quantity;
                        yield daoProduct.update(product);
                    }
                }
                else if (state_ == config_1.ACCEPTED_STATE) {
                    //If state is ACCEPTED, set the aprox delivery date
                    purchase.aproxDeliveryDate = this.setAproxDeliveryDate();
                    console.log("aproxDeliveryDate: " + purchase.aproxDeliveryDate);
                    //CREATES THE EVENT
                    //const newEvent = Event()
                    const daoCalendar = new DAOCalendar_1.DAOCalendar();
                    let newEvent = daoCalendar.createEvent();
                    newEvent.setUserId(userId_.toString());
                    newEvent.setDescription("Delivery of purchase " + purchaseId_);
                    newEvent.setDate(purchase.aproxDeliveryDate);
                    newEvent.setEventId(purchaseId_.toString());
                    newEvent.setLocation(location_);
                    //newEvent = new DeliveryEvent(newEvent);
                    let theEvent = new deliveryEvent_1.DeliveryEvent(newEvent);
                    console.log("theEvent: " + theEvent.schedule(EVENT_TYPE_1.EVENT_TYPE.DELIVERY));
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
                const result = yield collection.updateOne({ _id: purchaseId_ }, InfoToUpdate);
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the product was updated
                if (result.modifiedCount > 0) {
                    //console.log("La compra se actualizó con éxito");
                    //return {"name": "La compra se actualizó con éxito"};
                    //return theEvent
                    return { "name": state_ };
                    //return state_;
                }
                else {
                    return { "name": "No se encontró la compra a actualizar" };
                }
            }
            catch (err) {
                return { "name": "No se actualizó la compra" };
            }
        });
    }
    ;
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
    delete(purchaseId_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("code: " + purchaseId_);
                SingletonMongo_1.SingletonMongo.getInstance().connect();
                const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
                const collection = db.collection(config_1.PURCHASE_COLLECTION);
                //Verify existence of the product history
                const product = yield collection.findOne({ purchaseId: purchaseId_ });
                if (!product) {
                    //console.log("El producto " +  purchaseId_ + " no existe");
                    return { "name": "El producto no existe" };
                }
                //Delete the product in the database
                const result = yield collection.deleteOne({ purchaseId: purchaseId_ });
                SingletonMongo_1.SingletonMongo.getInstance().disconnect_(); //Disconnect from the database
                //Check if the product was deleted
                if (result.deletedCount > 0) {
                    return { "name": "La compra se eliminó con éxito" };
                }
                else {
                    return { "name": "No se encontró la compra a eliminar" };
                }
            }
            catch (err) {
                return { "name": "No se eliminó la compra" };
            }
        });
    }
    ;
    setAproxDeliveryDate() {
        let currentDate = new Date();
        //Obtains the days until the next shipping date of every option
        let ShippingDay1 = this.getDaysUntilShippingDate(ShippingDays_1.ShippingDays.Day1, currentDate);
        let ShippingDay2 = this.getDaysUntilShippingDate(ShippingDays_1.ShippingDays.Day2, currentDate);
        let ShippingDay3 = this.getDaysUntilShippingDate(ShippingDays_1.ShippingDays.Day3, currentDate);
        let bestShippingDay = 0;
        //if the best shipping day is today, it sets the aprox delivery date to the next delivery day
        if (ShippingDay1 == 0) { //special case 1 = Today is a shipping day
            bestShippingDay = ShippingDay2;
        }
        else if (ShippingDay2 == 0) { //special case 1 = Today is a shipping day
            bestShippingDay = ShippingDay3;
        }
        else if (ShippingDay3 == 0) { //special case 1 = Today is a shipping day
            bestShippingDay = ShippingDay1;
            //GENERAL CASES
        }
        else if (ShippingDay1 < ShippingDay2 && ShippingDay1 < ShippingDay3 && currentDate) {
            bestShippingDay = ShippingDay1;
        }
        else if (ShippingDay2 < ShippingDay1 && ShippingDay2 < ShippingDay3) {
            bestShippingDay = ShippingDay2;
        }
        else {
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
    getDaysUntilShippingDate(dayOfWeek, currentDate) {
        let daysUntilShippingDate = (dayOfWeek - currentDate.getDay() + 7) % 7;
        console.log("daysUntilShippingDate: " + dayOfWeek + " " + daysUntilShippingDate);
        return daysUntilShippingDate;
    }
}
exports.DAOPurchase = DAOPurchase;
