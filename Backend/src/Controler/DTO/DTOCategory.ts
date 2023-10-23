/*
Class DTOCategory

*/

export class DTOCategory{
    private categoryId = 0;
    private name = "";
    private subcategories: any[];

    public constructor(idCategory: number, name: string, subcategories: any[]){
        this.categoryId = idCategory;
        this.name = name;
        this.subcategories = subcategories;
    }
}