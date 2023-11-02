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
exports.AdminProduct = void 0;
const DAOProduct_1 = require("../DAO/DAOProduct");
class AdminProduct {
    constructor() {
        this.catalogue = [];
        this.catalogue = [];
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = new DAOProduct_1.DAOProduct();
            const result = yield daoProduct.getAll();
            console.log(result);
            return result;
        });
    }
    getProduct(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = new DAOProduct_1.DAOProduct();
            const result = yield daoProduct.getObject(_id);
            return result;
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = new DAOProduct_1.DAOProduct();
            const result = yield daoProduct.update(product);
            return result;
        });
    }
    deleteProduct(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = new DAOProduct_1.DAOProduct();
            const result = yield daoProduct.delete(_id);
            return result;
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = new DAOProduct_1.DAOProduct();
            const result = yield daoProduct.create(product);
            return result;
        });
    }
    getProductByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const daoProduct = new DAOProduct_1.DAOProduct();
            const result = yield daoProduct.getObjectByName(name);
            return result;
        });
    }
}
exports.AdminProduct = AdminProduct;
