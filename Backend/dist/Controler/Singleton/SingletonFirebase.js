"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonFirebase = void 0;
const app_1 = require("firebase/app");
const config_1 = require("../config");
//import { app } from 'firebase-admin';
class SingletonFirebase {
    constructor() {
        // Initialize Firebase
        const firebaseConfig = config_1.FIREBASE_CONFIG;
        const fbApp = (0, app_1.initializeApp)(firebaseConfig);
        this.firebaseApp = fbApp;
    }
    static getInstance() {
        //códigoConexión
        if (!SingletonFirebase.instance) {
            SingletonFirebase.instance = new SingletonFirebase();
        }
        return SingletonFirebase.instance;
    }
    getApp() {
        return this.firebaseApp;
    }
    disconnect() {
        //código disconect
    }
}
exports.SingletonFirebase = SingletonFirebase;
