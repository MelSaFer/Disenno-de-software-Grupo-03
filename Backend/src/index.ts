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

import {DAOPurchaseHistory} from "./Controler/DAO/DAOPurchase";
import {DTOPurchaseHistory} from "./Controler/DTO/DTOPurchaseHistory";

import {DAOCategory} from "./Controler/DAO/DAOCategory";
import {DTOCategory} from "./Controler/DTO/DTOCategory";

require("dotenv").config();

async function main() {

  SingletonMongo.getInstance().connect();
  const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
  const collection = db.collection(PRODUCT_COLLECTION);
  //const doc = { name: "Holaaaaaa", type: "hello" };
  //collection.insertOne(doc);
  //console.log("holaaa "+ collection.findOne({name: "1"}));




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
