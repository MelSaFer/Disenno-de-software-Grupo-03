/*
Class Content

*/
import { Image_ } from "./Image_";
import { Category } from "./Category";

export class Content{
    private id: number = 0;
    private name: string = "";
    private description: string = "";
    private date: Date = new Date();
    private imageId: number| undefined;
    private categoryId: number | undefined;
    private tags: string[] = [];

    //-------------------------------
    public constructor( id: number, name: string, description: string, date: Date, image: number, category: number, tags: string[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.imageId = image;
        this.categoryId = category;
        this.tags = tags;
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
    public getDescription(): string{
        return this.description;
    }
    public setDescription( description: string): void{
        this.description = description;
    }

    //-------------------------------
    public getDate(): Date{
        return this.date;
    }
    public setDate( date: Date): void{
        this.date = date;
    }

    //-------------------------------
    public getImage() : number | undefined{
        return this.imageId;
    }
    public setImage( image: number): void{
        this.imageId = image;
    }

    //-------------------------------
    public getCategory() : number | undefined{
        return this.categoryId;
    }
    public setCategory( category: number): void{
        this.categoryId = category;
    }

    //-------------------------------
    public getTags(): string[]{
        return this.tags;
    }
    public setTags( tags: string[]): void{
        this.tags = tags;
    }

}