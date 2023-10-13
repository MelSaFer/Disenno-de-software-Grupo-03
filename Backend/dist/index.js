"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const SingletonFirebase_1 = require("./Controler/Singleton/SingletonFirebase");
const auth_1 = require("firebase/auth");
const SingletonMongo_1 = require("./Controler/Singleton/SingletonMongo");
const config_1 = require("./Controler/Singleton/config");
require("dotenv").config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //await connectDB();
        //await connectDB();
        SingletonMongo_1.SingletonMongo.getInstance().connect();
        const db = SingletonMongo_1.SingletonMongo.getInstance().getDatabase(config_1.DATABASE_NAME);
        const collection = db.collection(config_1.PRODUCT_COLLECTION);
        const doc = { name: "Bing", type: "search engine" };
        collection.insertOne(doc);
        //const singletonMongo = SingletonMongo.getInstance();
        const singletonFirebase = SingletonFirebase_1.SingletonFirebase.getInstance();
        //const connection = await SingletonMongo;
        if (singletonFirebase instanceof SingletonFirebase_1.SingletonFirebase) {
            if (singletonFirebase) {
                //obtener credenciales solo para ver si funciona esta cosa
                const auth = (0, auth_1.getAuth)(singletonFirebase.getApp());
                (0, auth_1.signInWithEmailAndPassword)(auth, "fio@gmail.com", "fio123")
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
            }
            else {
                console.log("2");
            }
        }
        app_1.default.listen(config_1.PORT);
        console.log("Server on port ", config_1.PORT);
    });
}
main();
// app.use("/login", (require("./routes/loginRoutes")))
// app.use("/register", (require("./routes/userRoutes")))
