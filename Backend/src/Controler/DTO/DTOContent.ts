/*
Class Content

*/

export class DTOContent{
    private contentId: number = 0;
    private name: string = "";
    private description: string = "";
    private date: Date = new Date();
    private imageId = "";
    private category = null;
    private tags: string[] = [];

    //-------------------------------
    public constructor( contentId: number, name: string, description: string, date: Date, imageId: any, category: any, tags: string[]){
        this.contentId = contentId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.imageId = imageId;
        this.category = category;
        this.tags = tags;
    }

    //-------------------------------
    public getId(): number{
        return this.contentId;
    }
    public setId( contentId: number): void{
        this.contentId = contentId;
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
        return this.imageId;
    }
    public setImage( imageId: any): void{
        this.imageId = imageId;
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