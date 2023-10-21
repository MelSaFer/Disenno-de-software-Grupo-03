/*
Class Product

*/

export class DTOProduct{
    private productId: string = "";
    private description: string = "";
    private cuantityAvailable: number = 0;
    private imageId = "";
    private price: number = 0;

    //-------------------------------
    public constructor( productId: string, description: string, cuantityAvailable: number, imageId: any, price: number){
        this.productId = productId;
        this.description = description;
        this.cuantityAvailable = cuantityAvailable;
        this.imageId = imageId;
        this.price = price;
    }

}