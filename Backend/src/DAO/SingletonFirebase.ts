import {Singleton} from './Singleton';

class SingletonFirebase extends Singleton{
    private connectionString: String = "";
    private username: String = "";
    private password: String = "";

    public SingletonFirebase(username: String, password: String, connectionString: String, Singleton: Singleton){
        //super(Singleton);
        this.username = username;
        this.password = password;
        this.connectionString = connectionString;
    }

    public getConnection(){
        //códigoConexión
    }

    public disconnect(){
        //código disconect
    }

}