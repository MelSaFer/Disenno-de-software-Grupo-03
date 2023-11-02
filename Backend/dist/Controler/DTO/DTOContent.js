"use strict";
/*
Class Content

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.DTOContent = void 0;
class DTOContent {
    //-------------------------------
    constructor(contentId, title, description, date, imageId, categoryId, tags) {
        this.contentId = 0;
        this.title = "";
        this.description = "";
        this.date = new Date();
        this.imageId = "";
        this.categoryId = null;
        this.tags = [];
        this.contentId = contentId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.imageId = imageId;
        this.categoryId = categoryId;
        this.tags = tags;
    }
    //-------------------------------
    getId() {
        return this.contentId;
    }
    setId(contentId) {
        this.contentId = contentId;
    }
    //-------------------------------
    getName() {
        return this.title;
    }
    setName(title) {
        this.title = title;
    }
    //-------------------------------
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    //-------------------------------
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
    //-------------------------------
    getImage() {
        return this.imageId;
    }
    setImage(imageId) {
        this.imageId = imageId;
    }
    //-------------------------------
    getCategory() {
        return this.categoryId;
    }
    setCategory(categoryId) {
        this.categoryId = categoryId;
    }
    //-------------------------------
    getTags() {
        return this.tags;
    }
    setTags(tags) {
        this.tags = tags;
    }
}
exports.DTOContent = DTOContent;
