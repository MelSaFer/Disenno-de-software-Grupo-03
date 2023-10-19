import {DAO} from "./DAO"
import {PurchaseSchema} from "./schemas/Schemas"
import mongoose from "mongoose";
import {SingletonMongo} from "../Singleton/SingletonMongo";
import {DATABASE_NAME, PURCHASE_COLLECTION} from "../config";

/*-----------------------------------------------------------------------
DAO PURCHASE
 Class for managing the connection to the database and the queries related
 to the purchase 
 METHODS:
    - getAll()
    - getObject(code_: unknown)
    - create(object: any)
    - update(object: any)
    - delete(object: unknown)
-----------------------------------------------------------------------*/
export class DAOPurchase implements DAO{

    constructor(){};

    getAll(){

    };

    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a purchase in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - purchase if the purchase was found
        - false if the purchase was not found
    */
    async getObject(code_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);
            //Get the Purchase from the database, using the code
            const purchase = await collection.findOne({ orderNumber: code_ });
            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the content was found, return it, else return false
            if (purchase) {
                console.log("Se encontro: " + JSON.stringify(purchase, null, 2));
                return purchase;
            } else {
                console.log("No se encontró la compra con el código: " + code_);
                return false; 
            }
        } catch(err){
            console.log(err);
            return false;
        }
    };

     /*
    -----------------------------------------------------------------------
    CREATE METHOD
    Creates a purchase in the database
    PARAMS:
        - purchase: any
    RETURNS:
        - true if the purchase was created
        - false if the purchase was not created
    */
    async create(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);
            const Purchase = mongoose.model('Purchase', PurchaseSchema);

             //Create a new purchase  with the object received
             let newPurchase = new Purchase({
                orderNumber: object.orderNumber,
                purchaseDetails: object.purchaseDetails,
                products: object.products,
                voucher : object.voucher,   
                aproxDeliveryDate: object.aproxDeliveryDate,
                shippingAdress: object.shippingAdress,
                shippingPrice: object.shippingPrice
            });

            //Check if the purchase  already exists
            const purchase = await collection.findOne({ orderNumber: object.orderNumber });
            if (purchase){
                console.log("La compra " +  object.orderNumber + " ya existe");
                return false;
            }

            //Insert the purchase in the database
            const newPurchaseJson = JSON.stringify(newPurchase);
            const newPurchaseparsed = JSON.parse(newPurchaseJson);
            await collection.insertOne(newPurchaseparsed);

            //SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            console.log("Se insertó la compra con el código: " + newPurchaseparsed.orderNumber);
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    };

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Updates a purchase in the database
    PARAMS:
        - purchase: any
    RETURNS:
        - true if the purchase was updated
        - false if the purchase was not updated
    */
    async update(object: any){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASE_COLLECTION);
            const Purchase = mongoose.model('Purchase', PurchaseSchema);

            //Create a new purchase  with the object received
            let newPurchase = new Purchase({
                orderNumber: object.orderNumber,
                purchaseDetails: object.purchaseDetails,
                products: object.products,
                voucher : object.voucher,   
                aproxDeliveryDate: object.aproxDeliveryDate,
                shippingAdress: object.shippingAdress,
                shippingPrice: object.shippingPrice
            });

            //Create the updated object to replace the old one
            const InfoToUpdate = {
                $set: {
                    orderNumber: newPurchase.orderNumber,
                    purchaseDetails: newPurchase.purchaseDetails,
                    products: newPurchase.products,
                    voucher : newPurchase.voucher,   
                    aproxDeliveryDate: newPurchase.aproxDeliveryDate,
                    shippingAdress: newPurchase.shippingAdress,
                    shippingPrice: newPurchase.shippingPrice
                }
            };

            //Update the purchase in the database
            const result = await collection.updateOne({ orderNumber: newPurchase.orderNumber }, InfoToUpdate);

            //Check if the product was updated  
            if (result.modifiedCount > 0) {
                console.log("Purchase actualizado con éxito " + JSON.stringify(newPurchase, null, 2));
                return true;
            } else {
                console.log("No se encontró el purchase para actualizar o no se actualizó ningun campo");
                return false;
            }
        } catch(err){
            console.log(err);
            return false;
        }
    };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Deletes a purchase in the database
    PARAMS:
        - object: any
    RETURNS:
        - true if the purchase was deleted
        - false if the purchase was not deleted
    */
    delete(object: any){
        return true;
    };

}
