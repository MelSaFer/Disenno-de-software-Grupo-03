import { EVENT_TYPE } from "./EVENT_TYPE";
import { Component } from "./component";
import { Decorator } from "./decorator";

export class DeliveryEvent extends Decorator{
    //private makeup: String = "None";

    public constructor(component: Component){
        super(component);
    }

    /*
    SCHEDULE
    Assing the type of the event
    PARAMS: 
        - eventType: Always is going to set the type of the event as Delivey becase is a DeliveryEvent decorator
    */
    public schedule(eventType: EVENT_TYPE): any {
        return this.component?.schedule(EVENT_TYPE.DELIVERY) + " of delivery";        
        //return `Makeup Event(${super.schedule()})`;
    }
}