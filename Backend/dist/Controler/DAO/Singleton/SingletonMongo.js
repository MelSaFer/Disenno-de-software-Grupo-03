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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonMongo = void 0;
// Importa el paquete mongodb
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
class SingletonMongo {
    // Define el constructor como privado para evitar instancias externas
    constructor() {
        // Crea una nueva instancia de MongoClient usando la cadena de conexión
        const mongoUri = config_1.MONGODB_URI;
        this.client = new mongodb_1.MongoClient(mongoUri);
    }
    // Define el método estático getInstance que devuelve la instancia única de la clase
    static getInstance() {
        // Si no existe la instancia, la crea y la asigna a la propiedad instance
        if (!SingletonMongo.instance) {
            SingletonMongo.instance = new SingletonMongo();
        }
        // Devuelve la instancia
        return SingletonMongo.instance;
    }
    // Define el método connect que establece la conexión con MongoDB Atlas
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Usa el método connect del cliente de MongoDB
                yield this.client.connect();
                console.log("Connected to MongoDB Atlas");
            }
            catch (err) {
                // Maneja los posibles errores
                console.error("Error connecting to MongoDB Atlas: " + err);
            }
        });
    }
    disconnect_() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.client.close();
            }
        });
    }
    // Define el método getDatabase que devuelve la base de datos deseada
    getDatabase(dbName) {
        // Usa el método db del cliente de MongoDB pasando el nombre de la base de datos
        return this.client.db(dbName);
    }
}
exports.SingletonMongo = SingletonMongo;
/*
// En tu archivo principal, llama al método connect para iniciar la conexión
MongoClientSingleton.getInstance().connect();

// Luego, usa el método getDatabase para obtener la base de datos que quieras
const db = MongoClientSingleton.getInstance().getDatabase("exampleDb");

// Realiza las operaciones que necesites con las colecciones de la base de datos
const collection = db.collection("test");
const doc = { name: "Bing", type: "search engine" };
collection.insertOne(doc);
*/ 
