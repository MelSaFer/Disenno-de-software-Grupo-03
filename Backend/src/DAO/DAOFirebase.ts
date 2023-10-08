import DAO from './DAO';

class DAOFirebase extends DAO{
    private connectionString: String;

    
    public DAOFirebase(username: String, password: String, connectionString: String){
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