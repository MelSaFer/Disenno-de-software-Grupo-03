"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const EVENT_TYPE_1 = require("./EVENT_TYPE");
class Event {
    constructor() {
        this.eventId = "None";
        this.userId = "None";
        this.description = "None";
        this.startTime = new Date();
        this.endTime = new Date();
        this.date = new Date();
        this.eventType = EVENT_TYPE_1.EVENT_TYPE.OTHER;
        this.location = "None";
    }
    schedule(EventType) {
        this.eventType = EventType;
        console.log("Event scheduled " + this.eventType);
        return "This is an event";
    }
    getEventId() {
        return this.eventId;
    }
    getUserId() {
        return this.userId;
    }
    getDescription() {
        return this.description;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    getDate() {
        return this.date;
    }
    getEventType() {
        return this.eventType;
    }
    setEventType(eventType) {
        this.eventType = eventType;
    }
    setEventId(eventId) {
        this.eventId = eventId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setDescription(description) {
        this.description = description;
    }
    setStartTime(startTime) {
        this.startTime = startTime;
    }
    setEndTime(endTime) {
        this.endTime = endTime;
    }
    setDate(date) {
        this.date = date;
    }
    setLocation(location) {
        this.location = location;
    }
    getLocation() {
        return this.location;
    }
}
exports.Event = Event;
