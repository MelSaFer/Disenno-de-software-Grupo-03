import { config } from "dotenv";
config();

//API
export const API_URL = "http://localhost:3001";

export const PORT = 3001;

//MONGO DB
export const MONGODB_URI =
  "mongodb+srv://fiozelaya:eVNknldK3z3UwYLB@tiendaduende.aorp2bb.mongodb.net/?retryWrites=true&w=majority";
export const DATABASE_NAME = "TiendaDuende";
export const PRODUCT_COLLECTION = "Product";
export const USER_COLLECTION = "User";
export const CART_COLLECTION = "Cart";
export const CARTITEM_COLLECTION = "CartItem";
export const CATEGORY_COLLECTION = "Category";
export const CONTENT_COLLECTION = "Content";
export const SUBCATEGORY_COLLECTION = "SubCategory";
export const SHIPPINGADRESS_COLLECTION = "ShippingAddress";
export const ROLETYPE_COLLECTION = "RoleType";
//export const PURCHASEHISTORY_COLLECTION = "PurchaseHistory";
export const PURCHASE_COLLECTION = "Purchase";
export const IMAGETYPE_COLLECTION = "ImageType";
export const IMAGE_COLLECTION = "Image";
export const CALENDAR_COLLECTION = "Calendar";
//export const DB_NAME= "publicaciones"

//Firebase
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAUMTRo2R_g7Z1Vkhx4bjOqnqPQD7UZMDg",
  authDomain: "proyectodisenno-7d92d.firebaseapp.com",
  projectId: "proyectodisenno-7d92d",
  storageBucket: "proyectodisenno-7d92d.appspot.com",
  messagingSenderId: "365378457858",
  appId: "1:365378457858:web:6e46e6e6651e39e789b21b",
  measurementId: "G-MTMEGJ579Z",
};
