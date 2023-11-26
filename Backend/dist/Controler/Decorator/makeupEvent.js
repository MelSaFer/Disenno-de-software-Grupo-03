"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeupEvent = void 0;
const EVENT_TYPE_1 = require("./EVENT_TYPE");
const decorator_1 = require("./decorator");
class MakeupEvent extends decorator_1.Decorator {
    constructor(component) {
        super(component);
    }
    /*
    SCHEDULE
    Assing the type of the event
    PARAMS:
        - eventType: Always is going to set the type of the event as Makeup becase is a MakeupEvent decorator
    */
    schedule(eventType) {
        var _a;
        return ((_a = this.component) === null || _a === void 0 ? void 0 : _a.schedule(EVENT_TYPE_1.EVENT_TYPE.MAKEUP)) + " of makeup";
        //return `Makeup Event(${super.schedule()})`;
    }
}
exports.MakeupEvent = MakeupEvent;
