import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
}

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true });

async function agregarDocumento() {
  try {
    await client.connect();
    const db = client.db('mi_basededatos');
    const collection = db.collection('mi_coleccion');
    
    // Insertar un documento
    const documento = { campo1: 'valor1', campo2: 'valor2' };
    const resultado = await collection.insertOne(documento);
    console.log('Documento insertado:', resultado.insertedId);
  } finally {
    await client.close();
  }
}

agregarDocumento();
