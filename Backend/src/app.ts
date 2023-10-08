//Aquí va la configuración de express
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')



import loginRoutes from "./routes/loginRoutes"
import userRoutes from "./routes/userRoutes"

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(loginRoutes)
app.use(userRoutes)

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