import {Singleton} from './Singleton';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {MONGODB_URI} from './config';
import { connect, Connection } from 'mongoose';

dotenv.config(); //reading env var

export class SingletonMongo extends Singleton{
    private connection ?: Connection;
    //private connectionString: String = "";
    //private username: String = "";
    //private password: String = "";

    //private SingletonMongo(username: String, password: String, connectionString: String, Singleton: Singleton){
        //super(Singleton);
        //this.username = username;
        //this.password = password;
        //this.connectionString = connectionString;
    private async SingletonMongo(){
        const url = MONGODB_URI;
        //const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const connection = await connect(url);
        this.connection = connection.connection;
    }

    public getConnection(){
        //mongoose.connect(MONGODB_URI)
        //const url = MONGODB_URI;
        //const options = { useNewUrlParser: true, useUnifiedTopology: true };
        //const connection = await connect(url);
        //this.connection = connection.connection;
        if (!SingletonMongo.instance){
            SingletonMongo.instance = new Singleton();
        }
        return SingletonMongo.instance;
        //return true;
    }

    public disconnect(){
        //código disconect
        return true;
    }

}