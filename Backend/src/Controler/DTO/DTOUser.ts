/*
Class User

*/

export class User {
    private id: number = 0;
    private name: string = "";
    private email: string = "";
    private password: string = "";
    private roleType = 0;
    private purchaseHistory = null;
    private cart = null;

    //-------------------------------
    public constructor( id: number, name: string, email: string, password: 
        string, roleType: any, purchaseHistory: any, cart: any){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roleType = roleType;
        this.purchaseHistory = purchaseHistory;
        this.cart = cart;
    }

    //-------------------------------
    public getId(): number{
        return this.id;
    }
    public setId( id: number): void{
        this.id = id;
    }

    //-------------------------------
    public getName(): string{
        return this.name;
    }
    public setName( name: string): void{
        this.name = name;
    }

    //-------------------------------
    public getEmail(): string{
        return this.email;
    }
    public setEmail( email: string): void{
        this.email = email;
    }

    //-------------------------------
    public getPassword(): string{
        return this.password;
    }
    public setPassword( password: string): void{
        this.password = password;
    }

    //-------------------------------
    public getRoleType() {
        return this.roleType;
    }
    public setRoleType( roleType: any): void{
        this.roleType = roleType;
    }

    //-------------------------------
    public getPurchaseHistory() {
        return this.purchaseHistory;
    }
    public setPurchaseHistory( purchaseHistory: any): void{
        this.purchaseHistory = purchaseHistory;
    }

    //-------------------------------
    public getCart() {
        return this.cart;
    }
    public setCart( cart: any): void{
        this.cart = cart;
    }
    

}