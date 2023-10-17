/*
Class User

*/

export class DTOUser {
    private id: number = 0;
    private email: string = "";
    private roleType = 0;
    private purchaseHistory = null;
    private cart = null;

    //-------------------------------
    public constructor( id: number, email: string, roleType: any, purchaseHistory: any, cart: any){
        this.id = id;
        this.email = email;
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
    public getEmail(): string{
        return this.email;
    }
    public setEmail( email: string): void{
        this.email = email;
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