"use strict";
/*
Class DTOCategory

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOCategory = void 0;
class DTOCategory {
    constructor(idCategory, name, subcategories) {
        this.categoryId = 0;
        this.name = "";
        this.categoryId = idCategory;
        this.name = name;
        this.subcategories = subcategories;
    }
}
exports.DTOCategory = DTOCategory;
