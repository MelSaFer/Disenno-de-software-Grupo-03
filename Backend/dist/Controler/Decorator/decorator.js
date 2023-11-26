"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decorator = void 0;
class Decorator {
    constructor(component) {
        this.component = component;
    }
    getComponent() {
        return this.component;
    }
}
exports.Decorator = Decorator;
