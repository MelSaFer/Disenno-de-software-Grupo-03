import { Component } from "./component";

export class Event implements Component{
    private eventId: String = "None";
    private userId: String = "None";
    private description: String = "None";
    private startTime: Date = new Date();
    private endTime: Date = new Date();
    private date: Date = new Date();


    constructor() {}

    public schedule():any {
        return "This is an event"
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

    getDate(): Date {
        return this.date;
    }

    setEventId(eventId: String): void {
        this.eventId = eventId;
    }

    setUserId(userId: String): void {
        this.userId = userId;
    }

    setDescription(description: String): void {
        this.description = description;
    }

    setStartTime(startTime: Date): void {
        this.startTime = startTime;
    }

    setEndTime(endTime: Date): void {
        this.endTime = endTime;
    }

    setDate(date: Date): void {
        this.date = date;
    }
    
}