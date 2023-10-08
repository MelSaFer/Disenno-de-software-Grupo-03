/*
CLASS DAO

*/

export abstract class DAO {
    protected username: String
    protected password: String

    abstract getConnection(): boolean;

    abstract disconnect(): boolean;
}

