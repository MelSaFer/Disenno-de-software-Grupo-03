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
exports.AdminCart = void 0;
const config_1 = require("../config");
class AdminCart {
    constructor() {
        this.cart = [];
        this.cart = [];
    }
    loadCart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${config_1.API_URL}/cart`, { method: 'GET' });
                const data = yield response.json();
                this.cart = data;
                return data;
            }
            catch (err) {
                console.log("Error al cargar el carrito", err);
            }
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${config_1.API_URL}/cart`, {
                    method: 'POST',
                    body: JSON.stringify(product)
                });
                const data = yield response.json();
                this.cart = data;
                return data;
            }
            catch (err) {
                console.log("Error al agregar el producto", err);
            }
        });
    }
    updateProduct(product, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (quantity < 1 || quantity > product.stock) { //!!!
                    this.deleteProduct(product.id);
                    return;
                }
                const response = yield fetch(`${config_1.API_URL}/cart/${product}/${quantity}`, {
                    method: 'PUT',
                    body: JSON.stringify(product)
                });
                const data = yield response.json();
                this.cart = data;
                return data;
            }
            catch (err) {
                console.log("Error al actualizar el producto", err);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${config_1.API_URL}/cart/${id}`, {
                    method: 'DELETE',
                });
                const data = yield response.json();
                this.cart = data;
                return data;
            }
            catch (err) {
                console.log("Error al eliminar el producto", err);
            }
        });
    }
}
exports.AdminCart = AdminCart;
