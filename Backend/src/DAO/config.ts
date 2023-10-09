import { config } from "dotenv";
config();

export const PORT = 5000;

//MONGO DB
export const MONGODB_URI = "mongodb+srv://fiozelaya:eVNknldK3z3UwYLB@tiendaduende.aorp2bb.mongodb.net/?retryWrites=true&w=majority";
export const DATABASE_NAME = "TiendaDuende";
export const PRODUCT_COLLECTION = "Product";
//export const DB_NAME= "publicaciones"
//Firebase
export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAUMTRo2R_g7Z1Vkhx4bjOqnqPQD7UZMDg",
    authDomain: "proyectodisenno-7d92d.firebaseapp.com",
    projectId: "proyectodisenno-7d92d",
    storageBucket: "proyectodisenno-7d92d.appspot.com",
    messagingSenderId: "365378457858",
    appId: "1:365378457858:web:6e46e6e6651e39e789b21b",
    measurementId: "G-MTMEGJ579Z"
  };