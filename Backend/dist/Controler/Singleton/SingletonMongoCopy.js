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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonMongoO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config");
//import { async } from '@firebase/util';
dotenv_1.default.config(); //reading env var
class SingletonMongoO {
    constructor() {
        var _a;
        this.makeConn();
        console.log("constructor:" + ((_a = this.connection) === null || _a === void 0 ? void 0 : _a.name));
    }
    setConn(connection) {
        this.connection = connection;
    }
    //Get instance method
    static getInstance() {
        if (!SingletonMongoO.instance) {
            console.log("Creando la instancia");
            SingletonMongoO.instance = new SingletonMongoO();
        }
        return SingletonMongoO.instance;
    }
    //Get Connection
    getConn() {
        return this.connection;
    }
    //Make connection
    makeConn() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = config_1.MONGODB_URI;
            console.log(config_1.MONGODB_URI);
            try {
                const connection = yield mongoose_1.default.connect(url);
                console.log('Conexión exitosa a la base de datos:', connection.connections[0].name);
                this.setConn(connection.connection);
            }
            catch (error) {
                console.error('Error al conectar a la base de datos:', error);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.close();
                console.log('Conexión cerrada');
            }
            return true;
        });
    }
}
exports.SingletonMongoO = SingletonMongoO;
