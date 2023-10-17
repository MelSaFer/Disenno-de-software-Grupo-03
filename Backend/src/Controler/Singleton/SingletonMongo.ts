// Importa el paquete mongodb
import { MongoClient } from "mongodb";
import {MONGODB_URI} from '../config';


export class SingletonMongo {
  private static instance: SingletonMongo;
  private client: MongoClient;
  

  // Define el constructor como privado para evitar instancias externas
  private constructor() {
    // Crea una nueva instancia de MongoClient usando la cadena de conexión
    const mongoUri = MONGODB_URI;
    this.client = new MongoClient(mongoUri);
  }

  // Define el método estático getInstance que devuelve la instancia única de la clase
  public static getInstance(): SingletonMongo {
    // Si no existe la instancia, la crea y la asigna a la propiedad instance
    if (!SingletonMongo.instance) {
      SingletonMongo.instance = new SingletonMongo();
    }
    // Devuelve la instancia
    return SingletonMongo.instance;
  }

  // Define el método connect que establece la conexión con MongoDB Atlas
  public async connect() {
    try {
      // Usa el método connect del cliente de MongoDB
      await this.client.connect();
      console.log("Connected to MongoDB Atlas");
    } catch (err) {
      // Maneja los posibles errores
      console.error("Error connecting to MongoDB Atlas: " + err);
    }
  }

  public async disconnect_() {
    if(this.client) {
      await this.client.close();
    }
  }

  // Define el método getDatabase que devuelve la base de datos deseada
  public getDatabase(dbName: string) {
    // Usa el método db del cliente de MongoDB pasando el nombre de la base de datos
    return this.client.db(dbName);
  }
}
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