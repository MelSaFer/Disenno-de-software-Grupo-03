import {ISingleton} from './ISingleton';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {MONGODB_URI} from './config';
import { connect, Connection } from 'mongoose';

dotenv.config(); //reading env var

export class SingletonMongo implements ISingleton{
    protected static instance: SingletonMongo | undefined;
    private connection ?: Connection;

    private constructor(){
        this.makeConn();
        console.log("aja:" + this.connection?.name);
    }

    public getInstance(): SingletonMongo{
        if (!SingletonMongo.instance){
            SingletonMongo.instance = new SingletonMongo();
        }
        return SingletonMongo.instance;
    }

    //metodo con static porque no pude resolver lo de la interfaz
    public static getInstanceS(){
        if (!SingletonMongo.instance){
            SingletonMongo.instance = new SingletonMongo();
        }
        return SingletonMongo.instance;
    }

    public getConn(): Connection | undefined{
        return this.connection;
    }

    public async makeConn(){
        const url = MONGODB_URI;
        const connection = await mongoose.connect(url);
        console.log("aja2:" + connection.connection.name);
        this.connection = connection.connection;
    }

    public disconnect(){
        //código disconect
        return true;
    }

}