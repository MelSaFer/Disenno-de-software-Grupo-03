/*
Class Content

*/

export class Content{
    private id: number = 0;
    private name: string = "";
    private description: string = "";
    private date: Date = new Date();
    private image = null;
    private category = null;
    private tags: string[] = [];

    //-------------------------------
    public constructor( id: number, name: string, description: string, date: Date, image: any, category: any, tags: string[]){
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
    public getImage(){
        return this.image;
    }
    public setImage( image: any): void{
        this.image = image;
    }

    //-------------------------------
    public getCategory(){
        return this.category;
    }
    public setCategory( category: any): void{
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