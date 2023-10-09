import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {MONGODB_URI} from './config';
import { connect, Connection } from 'mongoose';
//import { async } from '@firebase/util';


dotenv.config(); //reading env var

export class SingletonMongoO{
    protected static instance: SingletonMongoO | undefined;
    private connection ?: Connection;

    private constructor(){
        this.makeConn();
        console.log("constructor:" + this.connection?.name);
    }

    private setConn(connection:Connection){
        this.connection = connection;
    }

    //Get instance method
    public static getInstance(){
        if (!SingletonMongoO.instance){
            console.log("Creando la instancia")
            SingletonMongoO.instance = new SingletonMongoO();
        }
        return SingletonMongoO.instance;
    }

    //Get Connection
    public getConn(): Connection | undefined{
        return this.connection;
    }

    //Make connection
    public async makeConn(){
        const url = MONGODB_URI;
        console.log(MONGODB_URI);
        try {
            const connection = await mongoose.connect(url);
            console.log('Conexión exitosa a la base de datos:', connection.connections[0].name);
            this.setConn(connection.connection);
          } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
          }
    }

    public async disconnect(){
        if (this.connection) {
            await this.connection.close();
            console.log('Conexión cerrada');
        }
        return true;
    }

}