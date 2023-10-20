import app from "./app";
import { SingletonFirebase } from "./Controler/Singleton/SingletonFirebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SingletonMongo } from "./Controler/Singleton/SingletonMongo";
import {
  DATABASE_NAME,
  PRODUCT_COLLECTION,
  USER_COLLECTION,
  SHIPPINGADRESS_COLLECTION,
  PURCHASE_COLLECTION,
  PURCHASEHISTORY_COLLECTION,
  IMAGETYPE_COLLECTION,
  IMAGE_COLLECTION,
  CATEGORY_COLLECTION,
  SUBCATEGORY_COLLECTION,
  CART_COLLECTION,
  CONTENT_COLLECTION,
  ROLETYPE_COLLECTION,
  CARTITEM_COLLECTION,
  PORT,
} from "./Controler/config";

import {DAOUser} from "./Controler/DAO/DAOUser";
import {DTOUser} from "./Controler/DTO/DTOUser";

import {DAOProduct} from "./Controler/DAO/DAOProduct";
import {DTOProduct} from "./Controler/DTO/DTOProduct";

import {DAOCart} from "./Controler/DAO/DAOCart";
import {DTOCart} from "./Controler/DTO/DTOCart";

import {DAOContent} from "./Controler/DAO/DAOContent";
import {DTOContent} from "./Controler/DTO/DTOContent";

import {DAOPurchaseHistory} from "./Controler/DAO/DAOPurchaseHistory";
import {DTOPurchaseHistory} from "./Controler/DTO/DTOPurchaseHistory";

require("dotenv").config();

async function main() {
  //await connectDB();
  //await connectDB();
  SingletonMongo.getInstance().connect();
  const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
  const collection = db.collection(PRODUCT_COLLECTION);
  //const doc = { name: "Holaaaaaa", type: "hello" };
  //collection.insertOne(doc);
  //console.log("holaaa "+ collection.findOne({name: "1"}));

  /*
  const daoUser = new DTOUser(1, "hola@gmail.com", 0, [], []);
  const dao = new DAOUser();
  dao.create(daoUser);
 */
/*
  const adoProduct = new DTOProduct("1", "  ", 0, [], 12);
  const daoP = new DAOProduct();
  daoP.create(adoProduct);
*/

  /*-------------------------------------------------------------
   //PRUEBAS PRODUCT
  //const daoProduct = new DTOProduct("90", "  ", 0, [], 12);
  const daoProd = new DAOProduct();
  const dtoProd = new DTOProduct("567", "  ", 0, [], 12);
  daoProd.create(dtoProd);
  //console.log(daoProd.getObject(1));
  const dtoProd2 = new DTOProduct("ajjc", "  ", 0, [], 54);
  daoProd.update(dtoProd2);
  //const singletonMongo = SingletonMongo.getInstance();
  const singletonFirebase = SingletonFirebase.getInstance();
  //const connection = await SingletonMongo;
 -------------------------------------------------------------*/
  let date: Date = new Date("2019-01-16");  
  /*-------------------------------------------------------------
  //PRUEBAS CART
  const daoCart = new DAOCart();
  const dtoCart = new DTOCart(2, []);
  const dtoCart2 = new DTOCart(3, []);
  daoCart.create(dtoCart);
  //daoCart.create(dtoProd2);
  //console.log(daoCart.getObject(2));
  console.log(await daoCart.getAll());
  //daoCart.delete(2);
  -------------------------------------------------------------*/

  /*-------------------------------------------------------------
  //PRUEBAS content
  const daoCont = new DAOContent();
  const dtoCont = new DTOContent(94, "prueba92", "Esto es una prueba2", date, 22, 2, []);
  daoCont.create(dtoCont);
  //console.log(daoCont.getObject(23));
  const dtoCont2 = new DTOContent(7991, "pruebaActualizada", "Esto es una prueba actualizada", date, 22, 2, []);
  daoCont.update(dtoCont2);
  console.log(daoCont.getObject(23));
  //const dtoCont = daoCont.getObject(23);
  //daoCont.delete(54);

  -----------------------------------------------------------------*/

  ///*-------------------------------------------------------------
  //Prueba Purchase H.
  //const daoPurchaseH = new DAOPurchaseHistory();
  //const dtoPurchaseH = new DTOPurchaseHistory([]);
  //daoCart.create(dtoProd);
  //console.log(daoCart.getObject(2));
  //-------------------------------------------------------------*/


  /*

  if (singletonFirebase instanceof SingletonFirebase) {
    if (singletonFirebase) {
      //obtener credenciales solo para ver si funciona esta cosa
      const auth = getAuth(singletonFirebase.getApp());
      signInWithEmailAndPassword(auth, "fio@gmail.com", "fio123")
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.email);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      console.log("2");
    }
  }
  */

  app.listen(PORT);
  console.log("Server on port ", PORT);

  
  //console.log(dao.create(daoUser));
}

main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))
