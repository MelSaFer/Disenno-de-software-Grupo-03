/*
Class DTOCart

*/

export class DTOCart{
    private id = 0;
    private items = [];
    //-------------------------------
    public constructor( id: number, items: []){
        this.id = id;
        this.items = items;
    }

    //-------------------------------
    public getId(): number{
        return this.id;
    }
    public setId( id: number): void{
        this.id = id;
    }

    //-------------------------------
    public getItems() {
        return this.items;
    }
    public setItems( items: []): void{
        this.items = items;
    }

}