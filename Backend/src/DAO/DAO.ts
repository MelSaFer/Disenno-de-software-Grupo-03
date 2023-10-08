/*
CLASS DAO

*/

abstract class DAO {
    private username: String
    private password: String

    abstract getConnection(): boolean;

    abstract disconnect(): boolean;
}

