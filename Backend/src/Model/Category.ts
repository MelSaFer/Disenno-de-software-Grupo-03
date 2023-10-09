import {Subcategory} from "./Subcategory"

export class Category{
    private idCategory: Number = 0;
    private name: String = "None";
    private subcategories: Subcategory[] = [];

    public constructor(idCategory: Number, name: String, subcategories: Subcategory[]){
        this.idCategory = idCategory;
        this.name = name;
        this.subcategories = subcategories;
    }
}