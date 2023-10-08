import app from "./app"
//import { connectDB } from "./mongoConn";
import { PORT } from "./config";
import { SingletonMongo } from "./DAO/SingletonMongo";
require('dotenv').config();

async function main() {
    //await connectDB();
    //await connectDB();
    const singletonMongo = SingletonMongo.getInstance();
    //const connection = await SingletonMongo;
    if (SingletonMongo){
      console.log("1")
    } else{
      console.log("2")
    }
    app.listen(PORT);
    console.log("Server on port ", PORT);
  }
  
  main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))