"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPurchase = void 0;
class AdminPurchase {
    constructor() {
        this.observers = [];
        this.state = null;
    }
    setState(state) {
        this.state = state;
    }
    attach(observer) {
        this.observers.push(observer);
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1)
            this.observers.splice(index, 1);
    }
    notify(body) {
        for (const observer of this.observers)
            observer.update(this, body);
    }
}
exports.AdminPurchase = AdminPurchase;
