// @ts-nocheck
import app from "./app";
import { PORT } from "./Controler/config";


require("dotenv").config();

// function intersection(first:any, second:any){
//     var s = new Set(second);
//     return first.filter(item => s.has(item));
// };
 


async function main() {
  

  app.listen(PORT);
  console.log("Server on port ", PORT);

  
  //console.log(dao.create(daoUser));
}

main();

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))