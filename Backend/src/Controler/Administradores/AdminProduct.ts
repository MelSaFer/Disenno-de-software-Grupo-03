import { API_URL } from '../config';
import { DAOProduct } from '../DAO/DAOProduct';

export class AdminProduct {
    catalogue = [];

    constructor() {
        this.catalogue = [];
    }

    async getAllProducts() {
        const daoProduct = new DAOProduct();
        const result = await daoProduct.getAll();
        console.log(result);
        return result;
    }

    async getProduct(_id: number) {
        const daoProduct = new DAOProduct();
        const result = await daoProduct.getObject(_id);
        return result;
    }

    async updateProduct(product: any) {
        const daoProduct = new DAOProduct();
        const result = await daoProduct.update(product);
        return result;
    }

    async deleteProduct(_id: number) {
        const daoProduct = new DAOProduct();
        const result = await daoProduct.delete(_id); 
        return result;
    }

    async addProduct(product: any) {
        const daoProduct = new DAOProduct();
        const result = await daoProduct.create(product);
        return result;
    }

    async getProductByName(name: string) {
        const daoProduct = new DAOProduct();
        const result = await daoProduct.getObjectByName(name);
        return result;
    }
}