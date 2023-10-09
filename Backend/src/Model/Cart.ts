/*
Class Cart

*/

import { CartItem } from "./CartItem";

export class Cart{
    private id: number = 0;
    private items: CartItem[] = [];

    //-------------------------------
    public constructor( id: number, items: CartItem[]){
        this.id = id;
        this.items = items;
    }

    //-------------------------------
    public getId(): number{
        return this.id;
    }
    public setId( id: number): void{
        this.id = id;
    }

    //-------------------------------
    public getItems(): CartItem[]{
        return this.items;
    }
    public setItems( items: CartItem[]): void{
        this.items = items;
    }

}