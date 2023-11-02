"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
class Content {
    //-------------------------------
    constructor(id, name, description, date, image, category, tags) {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.date = new Date();
        this.tags = [];
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.imageId = image;
        this.categoryId = category;
        this.tags = tags;
    }
    //-------------------------------
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    //-------------------------------
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
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
    setImage(image) {
        this.imageId = image;
    }
    //-------------------------------
    getCategory() {
        return this.categoryId;
    }
    setCategory(category) {
        this.categoryId = category;
    }
    //-------------------------------
    getTags() {
        return this.tags;
    }
    setTags(tags) {
        this.tags = tags;
    }
}
exports.Content = Content;
