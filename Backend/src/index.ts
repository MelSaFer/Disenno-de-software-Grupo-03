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

require("dotenv").config();

async function main() {
  //await connectDB();
  //await connectDB();
  SingletonMongo.getInstance().connect();
  const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
  const collection = db.collection(PRODUCT_COLLECTION);
  const doc = { name: "Bing", type: "search engine" };
  collection.insertOne(doc);
  //const singletonMongo = SingletonMongo.getInstance();
  const singletonFirebase = SingletonFirebase.getInstance();
  //const connection = await SingletonMongo;

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

  app.listen(PORT);
  console.log("Server on port ", PORT);

  const daoUser = new DTOUser(1, "hola@gmail.com", 0, [], []);
  const dao = new DAOUser();
  console.log(dao.create(daoUser));
}

main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))
