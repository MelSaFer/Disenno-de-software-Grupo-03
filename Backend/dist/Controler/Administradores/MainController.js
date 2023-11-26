"use strict";
/**
 MAIN CONTROLLER
 */
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
exports.MainController = void 0;
const AdminUser_1 = require("./AdminUser");
const AdminProduct_1 = require("./AdminProduct");
const AdminCategory_1 = require("./AdminCategory");
const AdminContent_1 = require("./AdminContent");
const AdminCalendar_1 = require("./AdminCalendar");
class MainController {
    constructor() { }
    addUser(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = yield adminUser.addUser(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    getInfoUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.getInfoUser(id);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    postInfoUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    updateCart(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.updateCart(userId, productId, quantity);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = yield adminUser.getAllUsers();
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    updateNotificationState(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = yield adminUser.updateNotificationState(userId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las notificaciones del usuario", err);
            }
        });
    }
    isUnread(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = yield adminUser.isUnread(userId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las notificaciones del usuario", err);
            }
        });
    }
    // -----------------------------
    /*
    METHOD GET CART
    PARAMS: userId
    */
    getCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.getCart(userId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD GET PURCHASE HISTORY
    PARAMS: userId
    */
    getPurchaseHistory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.getPurchaseHistory(userId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD PUT PURCHASE STATE
    PARAMS: userId, purchaseId, state
    */
    updatePurchaseState(userId, purchaseId, state, location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.updatePurchaseState(userId, purchaseId, state, location);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD MAKE PURCHASE
    PARAMS: userId, purchaseDetails, products, voucher, aproxDeliveryDate, shippingAdress, shippingPrice, state
    */
    makePurchase(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.makePurchase(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD GET NOTIFICATIONS
    PARAMS: userId
    */
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.getNotifications(userId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD ADD NOTIFICATION
    PARAMS: userId, notification
    */
    addNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminUser = new AdminUser_1.AdminUser();
                const result = adminUser.addNotification(notification);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    // -----------------------------
    /*
    METHOD ADD CONTENT
    */
    addContent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminContent = new AdminContent_1.AdminContent();
                const result = adminContent.addContent(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD GET ALL CONTENT
    */
    getAllContent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminContent = new AdminContent_1.AdminContent();
                const result = adminContent.getAllContent();
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD GET CONTENT BY ID
    */
    getContent(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminContent = new AdminContent_1.AdminContent();
                const result = adminContent.getContent(contentId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD UPDATE CONTENT
    */
    updateContent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminContent = new AdminContent_1.AdminContent();
                const result = adminContent.updateContent(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    /*
    METHOD DELETE CONTENT
    */
    deleteContent(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminContent = new AdminContent_1.AdminContent();
                const result = adminContent.deleteContent(contentId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    getFilteredContent(categoryNames, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminContent = new AdminContent_1.AdminContent();
                const result = adminContent.getFilteredContent(categoryNames, tags);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    // -----------------------------
    //STORE------------------------------------------------------
    getCatalogue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminProduct = new AdminProduct_1.AdminProduct();
                const result = adminProduct.getAllProducts();
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminProduct = new AdminProduct_1.AdminProduct();
                const result = adminProduct.getProduct(id);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    updateProduct(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminProduct = new AdminProduct_1.AdminProduct();
                const result = yield adminProduct.updateProduct(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminProduct = new AdminProduct_1.AdminProduct();
                const result = yield adminProduct.deleteProduct(id);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    addProduct(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminProduct = new AdminProduct_1.AdminProduct();
                const result = yield adminProduct.addProduct(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    getProductByName(name_) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminProduct = new AdminProduct_1.AdminProduct();
                const result = adminProduct.getProductByName(name_);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    ;
    //CATEGORY------------------------------------------------------
    addCategory(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.addCategory(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.getCategories();
                return result;
            }
            catch (err) {
                console.log("Error al cargar las categorias", err);
            }
        });
    }
    updateCategory(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.updateCategory(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    getCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.getCategory(categoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.deleteCategory(categoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar la info del usuario", err);
            }
        });
    }
    //SUBCATEGORY------------------------------------------------------
    getSubCategories(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.getSubCategories(categoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las categorias", err);
            }
        });
    }
    getSubcategory(categoryId, subCategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.getSubcategory(categoryId, subCategoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las categorias", err);
            }
        });
    }
    addSubCategory(categoryId, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.addSubCategory(categoryId, object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las categorias", err);
            }
        });
    }
    deleteSubCategory(categoryId, subcategoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.deleteSubCategory(categoryId, subcategoryId);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las categorias", err);
            }
        });
    }
    updateSubCategory(categoryId, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCategory = new AdminCategory_1.AdminCategory();
                const result = yield adminCategory.updateSubCategory(categoryId, object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar las categorias", err);
            }
        });
    }
    //CALENDAR------------------------------------------------------
    getCalendar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.getCalendar();
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    filterCalendar(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.filterCalendar(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    createEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.createEvent(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    getEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.getEvent(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    updateEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.updateEvent(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    deleteEvent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.deleteEvent(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
    verifyOverlap(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminCalendar = new AdminCalendar_1.AdminCalendar();
                const result = yield adminCalendar.verifyOverlap(object);
                return result;
            }
            catch (err) {
                console.log("Error al cargar el calendario", err);
            }
        });
    }
}
exports.MainController = MainController;
