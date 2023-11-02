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
exports.AdminContent = void 0;
const DAOContent_1 = require("../DAO/DAOContent");
class AdminContent {
    constructor() { }
    addContent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoUser = new DAOContent_1.DAOContent();
                const user = daoUser.create(object);
                return user;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    ;
    getAllContent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoContent = new DAOContent_1.DAOContent();
                const content = daoContent.getAll();
                return content;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    getContent(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoContent = new DAOContent_1.DAOContent();
                const content = daoContent.getObject(contentId);
                return content;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    updateContent(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoContent = new DAOContent_1.DAOContent();
                const content = daoContent.update(object);
                return content;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    deleteContent(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoContent = new DAOContent_1.DAOContent();
                const content = daoContent.delete(contentId);
                return content;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    getFilteredContent(categoryNames, tags) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daoContent = new DAOContent_1.DAOContent();
                const content = daoContent.getAllWithFilters(categoryNames, tags);
                return content;
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
}
exports.AdminContent = AdminContent;
