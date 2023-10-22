//Aquí va la configuración de express
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')



import loginRoutes from "./routes/loginRoutes"
import userRoutes from "./routes/userRoutes"
import galeryRoutes from "./routes/GaleryRoutes"
import categoryRoutes from "./routes/CategoryRoutes"
//import cartRoutes from "./routes/CartRoutes"
import storeRoutes from "./routes/StoreRoutes"

const app = express()
const bp = require('body-parser')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(loginRoutes)
app.use(userRoutes)
app.use(galeryRoutes)
app.use(categoryRoutes)
//app.use(cartRoutes)
app.use(storeRoutes)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

export var jsonParser = bp.json()
export var urlencodedParser = bp.urlencoded({ extended: false })

app.use((req: any, res: any, next: any) => {
    const error: any = new Error("Not found");
    error.status = 404;
    next(error);
  }
);

app.use((error: any, req: any, res: any, next: any) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  })



export default app;