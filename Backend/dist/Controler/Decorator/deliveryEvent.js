"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryEvent = void 0;
const EVENT_TYPE_1 = require("./EVENT_TYPE");
const decorator_1 = require("./decorator");
class DeliveryEvent extends decorator_1.Decorator {
    //private makeup: String = "None";
    constructor(component) {
        super(component);
    }
    /*
    SCHEDULE
    Assing the type of the event
    PARAMS:
        - eventType: Always is going to set the type of the event as Delivey becase is a DeliveryEvent decorator
    */
    schedule(eventType) {
        var _a;
        return ((_a = this.component) === null || _a === void 0 ? void 0 : _a.schedule(EVENT_TYPE_1.EVENT_TYPE.DELIVERY)) + " of delivery";
        //return `Makeup Event(${super.schedule()})`;
    }
}
exports.DeliveryEvent = DeliveryEvent;
