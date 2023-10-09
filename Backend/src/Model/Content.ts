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
    private image: Image_| undefined;
    private category: Category | undefined;
    private tags: string[] = [];

    //-------------------------------
    public constructor( id: number, name: string, description: string, date: Date, image: Image_, category: Category, tags: string[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.image = image;
        this.category = category;
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
    public getImage() : Image_ | undefined{
        return this.image;
    }
    public setImage( image: Image_): void{
        this.image = image;
    }

    //-------------------------------
    public getCategory() : Category | undefined{
        return this.category;
    }
    public setCategory( category: Category): void{
        this.category = category;
    }

    //-------------------------------
    public getTags(): string[]{
        return this.tags;
    }
    public setTags( tags: string[]): void{
        this.tags = tags;
    }

}