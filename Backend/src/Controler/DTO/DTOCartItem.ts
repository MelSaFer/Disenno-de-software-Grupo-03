/*
Class DTOCartItem

*/

export class CartItem{
    private id = 0;
    private cuantity = 0;
    private product = null;

    //-------------------------------
    public constructor( id: number, cuantity: number, product: any){
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
    public getProduct() {
        return this.product;
    }

    public setProduct( product: any): void{
        this.product = product;
    }
}