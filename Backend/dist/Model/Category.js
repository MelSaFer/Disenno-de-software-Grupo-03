"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    constructor(idCategory, name, subcategories) {
        this.idCategory = 0;
        this.name = "None";
        this.subcategories = [];
        this.idCategory = idCategory;
        this.name = name;
        this.subcategories = subcategories;
    }
}
exports.Category = Category;
