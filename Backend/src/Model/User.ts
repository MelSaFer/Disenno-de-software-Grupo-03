/*
Class User

*/

import { RoleType } from "./RoleType";
import { PurchaseHistory } from "./PurchaseHistory";
import { Cart } from "./Cart";

export class User {
    private id: number = 0;
    private name: string = "";
    private email: string = "";
    private password: string = "";
    private roleType: RoleType = 0;
    private purchaseHistory: PurchaseHistory = PurchaseHistory | undefined;
    private cart: Cart | undefined;

    //-------------------------------
    public constructor( id: number, name: string, email: string, password: 
        string, roleType: RoleType, purchaseHistory: PurchaseHistory, cart: Cart){
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
    public getRoleType(): RoleType{
        return this.roleType;
    }
    public setRoleType( roleType: RoleType): void{
        this.roleType = roleType;
    }

    //-------------------------------
    public getPurchaseHistory(): PurchaseHistory{
        return this.purchaseHistory;
    }
    public setPurchaseHistory( purchaseHistory: PurchaseHistory): void{
        this.purchaseHistory = purchaseHistory;
    }

    //-------------------------------
    public getCart(): Cart{
        return this.cart;
    }
    public setCart( cart: Cart): void{
        this.cart = cart;
    }
    

}