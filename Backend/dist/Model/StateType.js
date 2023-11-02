"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateType = void 0;
var StateType;
(function (StateType) {
    StateType[StateType["PENDING"] = 0] = "PENDING";
    StateType[StateType["APPROVED"] = 1] = "APPROVED";
    StateType[StateType["REJECTED"] = 2] = "REJECTED";
    StateType[StateType["SEND"] = 3] = "SEND";
    StateType[StateType["DELIVERED"] = 4] = "DELIVERED";
})(StateType || (exports.StateType = StateType = {}));
