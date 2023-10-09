/*
Class Product

*/

import { Image_ } from "./Image";

export class Product{
    private code: string = "";
    private description: string = "";
    private cuantityAvailable: number = 0;
    private image: Image_ = Image_ | undefined;
    private price: number = 0;

    //-------------------------------
    public constructor( code: string, description: string, cuantityAvailable: number, image: Image_, price: number){
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
    public getImage(): Image_{
        return this.image;
    }
    public setImage( image: Image_): void{
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