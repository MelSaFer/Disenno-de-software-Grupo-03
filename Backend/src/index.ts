import app from "./app"
//import { connectDB } from "./mongoConn";
import { PORT } from "./config";
import { SingletonMongo } from "./DAO/SingletonMongo";
import { SingletonFirebase } from "./DAO/SingletonFirebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { stringify } from "querystring";
//import { getClass } from "@typegoose/typegoose";

require('dotenv').config();

async function main() {
    //await connectDB();
    //await connectDB();
    const singletonMongo = SingletonMongo.getInstance();
    const singletonFirebase = SingletonFirebase.getInstance();
    //const connection = await SingletonMongo;

    if (singletonMongo instanceof SingletonMongo) {
      if (singletonMongo){
        //const client = singletonMongo.getConn();
        //if (!client) {
        //  console.log("1- no se pudo conectar a mongo")
        //}
        //else{
        //  console.log("se pudo conectar a mongo")
        //  console.log(client.getClient())
        //}
        
      } else{
        console.log("2")
      }
    } 
	

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