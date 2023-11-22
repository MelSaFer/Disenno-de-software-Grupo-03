import { EVENT_TYPE } from "./EVENT_TYPE";
import { Component } from "./component";

export class Event implements Component{
    private eventId: string = "None";
    private userId: string = "None";
    private description: string = "None";
    private startTime: Date = new Date();
    private endTime: Date = new Date();
    private date: Date = new Date();
    private eventType: EVENT_TYPE = EVENT_TYPE.OTHER;
    private location: string = "None";


    constructor() {}

    public schedule(EventType: EVENT_TYPE):any {
        this.eventType = EventType;
        console.log("Event scheduled " + this.eventType );
        
        return "This is an event"
    }

    getEventId(): string {
        return this.eventId;
    }

    getUserId(): string {
        return this.userId;
    }

    getDescription(): string {
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

    getEventType(): EVENT_TYPE {
        return this.eventType;
    }

    setEventType(eventType: EVENT_TYPE): void {
        this.eventType = eventType;
    }

    setEventId(eventId: string): void {
        this.eventId = eventId;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    setDescription(description: string): void {
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

    setLocation(location: string): void {   
        this.location = location;
    }

    getLocation(): string {
        return this.location;
    }
    
}