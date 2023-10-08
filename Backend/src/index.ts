import app from "./app"
import { connectDB } from "./mongoConn";
import { PORT } from "./config";

async function main() {
    //await connectDB();
    await connectDB();
    app.listen(PORT);
    console.log("Server on port ", PORT);
  }
  
  main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))