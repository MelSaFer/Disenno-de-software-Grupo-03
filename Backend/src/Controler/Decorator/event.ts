import { Component } from "./component";

export class Event implements Component{
    private eventId: String = "None";
    private userId: String = "None";
    private description: String = "None";
    private startTime: Date = new Date();
    private endTime: Date = new Date();
    private date: Date = new Date();


    constructor(eventId: String, userId: String, description: String, startTime: Date, endTime: Date, date: Date) {
        this.eventId = eventId;
        this.userId = userId;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
    }

    schedule(): string {
        return `Event ${this.eventId} scheduled for ${this.date} from ${this.startTime} to ${this.endTime} with description ${this.description}`;
    }

    getEventId(): String {
        return this.eventId;
    }

    getUserId(): String {
        return this.userId;
    }

    getDescription(): String {
        return this.description;
    }

    getStartTime(): Date {
        return this.startTime;
    }

    getEndTime(): Date {
        return this.endTime;
    }
    
}