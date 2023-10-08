import {Singleton} from './Singleton';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import dotenv from 'dotenv';
import {FIREBASE_CONFIG} from './config';
import { app } from 'firebase-admin';

export class SingletonFirebase{
    protected static instance: SingletonFirebase | undefined;
    protected firebaseApp ?: FirebaseApp;

    private constructor(){
        // Initialize Firebase
        const firebaseConfig = FIREBASE_CONFIG;
        const fbApp = initializeApp(firebaseConfig);
        this.firebaseApp = fbApp;
    }

    public static getInstance(){
        //códigoConexión
        if (!SingletonFirebase.instance){
            SingletonFirebase.instance = new SingletonFirebase();
        }
        return SingletonFirebase.instance;
    }

    public getApp(): FirebaseApp | undefined{
        return this.firebaseApp;
    }

    public disconnect(){
        //código disconect
    }

}