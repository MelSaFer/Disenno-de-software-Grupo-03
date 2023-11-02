"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCategory = void 0;
const DAOCategory_1 = require("../DAO/DAOCategory");
class AdminCategory {
    constructor() { }
    addCategory(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.create(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.getAll();
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    updateCategory(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.update(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    getCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.getObject(categoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.delete(categoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    //SUBCATEGORY------------------------------------------------------
    getSubCategories(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.getSubcategories(categoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    getSubcategory(categoryId, subCategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.getSubcategory(categoryId, subCategoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    addSubCategory(categoryId, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.addSubcategory(categoryId, object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    deleteSubCategory(categoryId, subcategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoCategory = new DAOCategory_1.DAOCategory();
                const result = yield daoCategory.deleteSubcategory(categoryId, subcategoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la información de la categoría", err);
            }
        });
    }
    updateSubCategory(categoryId, object) {
        try {
            const daoCategory = new DAOCategory_1.DAOCategory();
            const result = daoCategory.updateSubcategory(categoryId, object);
            return result;
        }
        catch (err) {
            console.log("Error al cargar la información de la categoría", err);
        }
    }
}
exports.AdminCategory = AdminCategory;
