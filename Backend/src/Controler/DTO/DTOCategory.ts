/*
Class DTOCategory

*/

export class DTOCategory{
    private idCategory = 0;
    private name = "None";
    private subcategories = [];

    public constructor(idCategory: number, name: string, subcategories: []){
        this.idCategory = idCategory;
        this.name = name;
        this.subcategories = subcategories;
    }
}