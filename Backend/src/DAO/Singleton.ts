/*
Class Singleton

*/

export class Singleton{
    protected static instance: Singleton;

    //-------------------------------
    private Singleton( instance: Singleton){
        Singleton.instance = instance;

    }

    public static getInstance(): Singleton {
        if (!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

}