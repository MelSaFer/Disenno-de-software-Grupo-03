/*
Class CartItem

*/

import { Product } from "./Product";

export class CartItem{
    private id: number = 0;
    private cuantity: number = 0;
    private product: Product = Product | undefined;

    //-------------------------------
    public constructor( id: number, cuantity: number, product: Product){
        this.id = id;
        this.cuantity = cuantity;
        this.product = product;
    }

    //-------------------------------
    public getId(): number{
        return this.id;
    }
    public setId( id: number): void{
        this.id = id;
    }

    //-------------------------------
    public getCuantity(): number{
        return this.cuantity;
    }
    public setCuantity( cuantity: number): void{
        this.cuantity = cuantity;
    }

    //-------------------------------
    public getProduct(): Product{
        return this.product;
    }
    public setProduct( product: Product): void{
        this.product = product;
    }
}