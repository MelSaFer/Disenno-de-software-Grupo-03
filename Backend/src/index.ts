import app from "./app"

app.listen(3000, () => {
    console.log("probando el servidor");
})

// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))