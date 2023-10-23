/*
Class Content

*/

export class DTOContent{
    private contentId: number = 0;
    private title: string = "";
    private description: string = "";
    private date: Date = new Date();
    private imageId = "";
    private categoryId = null;
    private tags: string[] = [];

    //-------------------------------
    public constructor( contentId: number, title: string, description: string, date: Date, imageId: any, categoryId: any, tags: string[]){
        this.contentId = contentId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.imageId = imageId;
        this.categoryId = categoryId;
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
        return this.title;
    }
    public setName( title: string): void{
        this.title = title;
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
        return this.categoryId;
    }
    public setCategory( categoryId: any): void{
        this.categoryId = categoryId;
    }

    //-------------------------------
    public getTags(): string[]{
        return this.tags;
    }
    public setTags( tags: string[]): void{
        this.tags = tags;
    }

}