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

import {DAOContent} from "./Controler/DAO/DAOContent";
import {DTOContent} from "./Controler/DTO/DTOContent";

import {DAOPurchase} from "./Controler/DAO/DAOPurchase";
import {DTOPurchase} from "./Controler/DTO/DTOPurchase";

import {DAOCategory} from "./Controler/DAO/DAOCategory";
import {DTOCategory} from "./Controler/DTO/DTOCategory";

import * as data from "./Controler/DAO/schemas/data";
import { MainController } from "./Controler/Administradores/MainController";

require("dotenv").config();

async function main() {

  SingletonMongo.getInstance().connect();
  const db = SingletonMongo.getInstance().getDatabase(DATABASE_NAME);
  const collection = db.collection(PRODUCT_COLLECTION);
  //const doc = { name: "Holaaaaaa", type: "hello" };
  //collection.insertOne(doc);
  //console.log("holaaa "+ collection.findOne({name: "1"}));

  /*
  USER TEST
  */
 /*
  const daoUser = new DAOUser();
  daoUser.create(data.user1);
  daoUser.create(data.user2);
  daoUser.create(data.user3);

  daoUser.update(data.user4);

  daoUser.delete(3);

  console.log(await daoUser.getAll());

  daoUser.getObject(1);

  daoUser.updateCart(1, 1, 1);
  daoUser.updateCart(data.user1, 3, 1);
  */

  //const mainController = new MainController();

  //mainController.getInfoUser();

  /*
  PRODUCT TEST
  */
  //const daoProduct = new DAOProduct();

  //daoProduct.create(data.product1);
  //daoProduct.create(data.product2);
  //daoProduct.create(data.product3);


  /*
  CONTENT TEST
  */
  // const daoContent = new DAOContent();
  // daoContent.create(data.content1);
  // daoContent.create(data.content2);
  // daoContent.create(data.content3);


  /*
  PURCHASE TEST
  */
  // const daoPurchase = new DAOPurchase();
  // daoPurchase.create(data.purchase1);
  // daoPurchase.create(data.purchase2);
  // daoPurchase.create(data.purchase3);


  /*
  CATEGORY TEST
  */
  // const daoCategory = new DAOCategory();
  // daoCategory.create(data.category1);
  // daoCategory.create(data.category2);
  // daoCategory.create(data.category3);




  app.listen(PORT);
  console.log("Server on port ", PORT);

  
  //console.log(dao.create(daoUser));
}

main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))
