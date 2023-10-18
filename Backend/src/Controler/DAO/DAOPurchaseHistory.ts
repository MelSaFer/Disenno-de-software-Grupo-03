import {DAO} from "./DAO"
import {PurchaseHistorySchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, PURCHASEHISTORY_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
DAO PURCHASE HISTORY
 Class for managing the connection to the database and the queries related
 to the purchase history
 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOPurchaseHistory implements DAO{

    constructor(){};

    getAll(){

    };
    async getObject(code_: unknown){
        try{
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASEHISTORY_COLLECTION);
            const purchaseHistory = await collection.findOne({ orderNumber: code_ });
            if (purchaseHistory) {
                console.log("Se encontro: " + JSON.stringify(purchaseHistory, null, 2));
                return purchaseHistory;
            } else {
                console.log("No se encontró el historial con el código: " + code_);
                return false; // Si no se encuentra el producto, puedes retornar null o algún otro valor indicativo.
            }
        } catch(err){
            console.log(err);
            return false;
        }
    };

    async create(object: any) {
        // implementacion
        // Aqui llamamos al singleton
        // Me pego a Mongo para hacer una acción especifica
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASEHISTORY_COLLECTION);
            const PurchaseHistory = mongoose.model('PurchaseHistory', PurchaseHistorySchema);
            let newPurchaseHistory = new PurchaseHistory({
                orderNumber: object.orderNumber,
                purchaseDetails: object.purchaseDetails,
                products: object.products,
                voucher : object.voucher,   
                aproxDeliveryDate: object.aproxDeliveryDate,
                shippingAdress: object.shippingAdress,
                shippingPrice: object.shippingPrice
            });

            const purchaseHistory = await collection.findOne({ orderNumber: object.orderNumber });
            if (purchaseHistory){
                console.log("El historial " +  object.orderNumber + " ya existe");
                return false;
            }
            const newPurchaseHistoryJson = JSON.stringify(newPurchaseHistory);
            const newPurchaseHistoryparsed = JSON.parse(newPurchaseHistoryJson);
            await collection.insertOne(newPurchaseHistoryparsed);
            console.log("Se insertó: " + newPurchaseHistoryJson);
            return true;
            
        }catch(err){
            console.log(err);
        }   
        return true;
    };

    update(object: unknown){
        return true;
    };

    delete(object: unknown){
        return true;
    };
}
