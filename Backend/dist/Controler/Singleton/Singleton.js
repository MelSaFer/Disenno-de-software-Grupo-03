"use strict";
/*
Class Singleton

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
class Singleton {
    //-------------------------------
    Singleton(instance) {
        Singleton.instance = instance;
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
exports.Singleton = Singleton;
