//Aquí va la configuración de express
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 3000

import loginRoutes from "./routes/loginRoutes"
import userRoutes from "./routes/userRoutes"

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(loginRoutes)
app.use(userRoutes)

export default app;