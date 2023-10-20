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

    /*
    -----------------------------------------------------------------------
    GET ALL METHOD
    Gets all the purchasehistories in the database
    PARAMS:
        - none
    RETURNS:
        - purchasehistories: array of purchasehistories
    */
        async getAll(){
            try {
                //Get the database instance from the singleton and connect to it
                SingletonMongo.getInstance().connect();
                const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
                const collection = db.collection(PURCHASEHISTORY_COLLECTION);
            
                //Get the purchasehistories from the database, using the code
                let purchasehistories = await collection.find({}).toArray();
                SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
                if (purchasehistories) {
                    //console.log("Se encontraron los carritos: " + JSON.stringify(purchasehistories, null, 2));
                    return purchasehistories;
                }
                else{
                    console.log("No se encontraron carritos");
                    return false;
                }
                
                
    
            } catch (error) {
                console.log(error);
                return false;
            }
            
    
        };

    /*
    -----------------------------------------------------------------------
    GET OBJECT METHOD
    Gets a purchase history in the database
    PARAMS:
        - code: unknown
    RETURNS:
        - purchase history if the purchase history was found
        - false if the purchase history was not found
    */
    async getObject(code_: unknown){
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASEHISTORY_COLLECTION);
            //Get the Purchase History from the database, using the code
            const purchaseHistory = await collection.findOne({ orderNumber: code_ });
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            // If the product history was found, return it, else return false
            if (purchaseHistory) {
                console.log("Se encontro: " + JSON.stringify(purchaseHistory, null, 2));
                return purchaseHistory;
            } else {
                console.log("No se encontró el historial con el código: " + code_);
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
    Create a purchase history in the database
    PARAMS:
        - object: Product History
    RETURNS:
        - true if the purchase history was created
        - false if the purchase history was not created
    */
    async create(object: any) {
        try{
            //Get the database instance from the singleton and connect to it
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASEHISTORY_COLLECTION);
            const PurchaseHistory = mongoose.model('PurchaseHistory', PurchaseHistorySchema);
            
            //Create a new purchase history with the object received
            let newPurchaseHistory = new PurchaseHistory({
                orderNumber: object.orderNumber,
                purchaseDetails: object.purchaseDetails,
                products: object.products,
                voucher : object.voucher,   
                aproxDeliveryDate: object.aproxDeliveryDate,
                shippingAdress: object.shippingAdress,
                shippingPrice: object.shippingPrice
            });

            //Check if the purchase history already exists
            const purchaseHistory = await collection.findOne({ orderNumber: object.orderNumber });
            if (purchaseHistory){
                console.log("El historial " +  object.orderNumber + " ya existe");
                return false;
            }
            
            //Insert the purchase history in the database, convert it to JSON and parse it
            const newPurchaseHistoryJson = JSON.stringify(newPurchaseHistory);
            const newPurchaseHistoryparsed = JSON.parse(newPurchaseHistoryJson);
            await collection.insertOne(newPurchaseHistoryparsed);
            console.log("Se insertó: " + newPurchaseHistoryJson);
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            return true;
            
        }catch(err){
            console.log(err);
        }   
        return true;
    };

    /*
    -----------------------------------------------------------------------
    UPDATE METHOD
    Update a purchase history in the database
    PARAMS:
        - object: unknown
    RETURNS:
        - true if the purchase history was updated
        - false if the purchase history was not updated
    */
    async update(object: any){
        //Si voy a agregar algo al carrito, me pego a mongo y lo agrego
        //no lo agrege porque creo que se plantea diferente al resto
        try{
            const purchasehistory = mongoose.model('PurchaseHistory', PurchaseHistorySchema);
            const result = await purchasehistory.updateOne(object);
        }catch(err){
            console.log(err);
        }
        return true;
    };

    /*
    -----------------------------------------------------------------------
    DELETE METHOD
    Delete a purchase history in the database
    PARAMS:
        - object: unknown
    RETURNS:
        - true if the purchase history was deleted
        - false if the purchase history was not deleted
    */
    async delete(code_: unknown){
        try{
            console.log("code: " + code_);
            SingletonMongo.getInstance().connect();
            const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
            const collection = db.collection(PURCHASEHISTORY_COLLECTION);

            //Verify existence of the product history
            const producthistory = await collection.findOne({ id: code_ });
            if (!producthistory){
                console.log("El producthistory " +  code_ + " no existe");
                return false;
            }
            //Delete the producthistory in the database
            const result = await collection.deleteOne({ id: code_ });
            
            SingletonMongo.getInstance().disconnect_();    //Disconnect from the database
            //Check if the producthistory was deleted
            if (result.deletedCount > 0) {
                console.log("Product History eliminado con éxito");
                return true;
            } else {
                console.log("No se encontró el producthistory para eliminar");
                return false;
            }

        } catch(err){
            console.log(err);
        }
        return true;
    };
}
