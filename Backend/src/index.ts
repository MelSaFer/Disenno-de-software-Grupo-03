import app from "./app"
//import { connectDB } from "./mongoConn";
import { PORT } from "./config";
//import { SingletonMongoO } from "./DAO/SingletonMongo";
import { SingletonFirebase } from "./DAO/SingletonFirebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { stringify } from "querystring";
//import { getClass } from "@typegoose/typegoose";
import { SingletonMongo } from "./DAO/SingletonMongo";
import {DATABASE_NAME, PRODUCT_COLLECTION} from './DAO/config';

require('dotenv').config();

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
      if (singletonFirebase){

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

      } else{
        console.log("2")
      }
    }

    app.listen(PORT);
    console.log("Server on port ", PORT);
  }
  
  main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))