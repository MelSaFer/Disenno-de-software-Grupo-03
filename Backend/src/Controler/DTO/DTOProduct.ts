/*
Class Product

*/

export class DTOProduct{
    private code: string = "";
    private description: string = "";
    private cuantityAvailable: number = 0;
    private image = null;
    private price: number = 0;

    //-------------------------------
    public constructor( code: string, description: string, cuantityAvailable: number, image: any, price: number){
        this.code = code;
        this.description = description;
        this.cuantityAvailable = cuantityAvailable;
        this.image = image;
        this.price = price;
    }

    //-------------------------------
    public getCode(): string{
        return this.code;
    }
    public setCode( code: string): void{
        this.code = code;
    }

    //-------------------------------
    public getDescription(): string{
        return this.description;
    }
    public setDescription( description: string): void{
        this.description = description;
    }

    //-------------------------------
    public getCuantityAvailable(): number{
        return this.cuantityAvailable;
    }
    public setCuantityAvailable( cuantityAvailable: number): void{
        this.cuantityAvailable = cuantityAvailable;
    }

    //-------------------------------
    public getImage() {
        return this.image;
    }
    public setImage( image: any): void{
        this.image = image;
    }

    //-------------------------------
    public getPrice(): number{
        return this.price;
    }
    public setPrice( price: number): void{
        this.price = price;
    }


}