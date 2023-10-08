import {Singleton} from './Singleton';

class SingletonMongo extends Singleton{
    private connectionString: String = "";
    private username: String = "";
    private password: String = "";

    public SingletonMongo(username: String, password: String, connectionString: String, Singleton: Singleton){
        //super(Singleton);
        this.username = username;
        this.password = password;
        this.connectionString = connectionString;
    }

    public getConnection(){
        //códigoConexión
        return true;
    }

    public disconnect(){
        //código disconect
        return true;
    }

}