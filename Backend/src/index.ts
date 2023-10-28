// @ts-nocheck
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

// function intersection(first:any, second:any){
//     var s = new Set(second);
//     return first.filter(item => s.has(item));
// };
 


async function main() {

  const dao = new DAOContent();

  const filter1: string[] = [];
  //const filter2 = ["Brillante", "Elegante"];
  const filter2 : string[]= [];
  dao.getAllWithFilters(filter1, filter2);

  // var first = [ 1, 2, 3 ];
  // var second = [ 2, 3, 4, 5 ];
 
  // var common = intersection(first, second);
  // console.log("The common elements are: " + common);


  

  app.listen(PORT);
  console.log("Server on port ", PORT);

  
  //console.log(dao.create(daoUser));
}

main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))
