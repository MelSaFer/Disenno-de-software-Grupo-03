import { EVENT_TYPE } from "./EVENT_TYPE";
import { Component } from "./component";
import { Decorator } from "./decorator";

export class MakeupEvent extends Decorator{

    public constructor(component: Component){
        super(component);
    }

    /*
    SCHEDULE
    Assing the type of the event
    PARAMS: 
        - eventType: Always is going to set the type of the event as Makeup becase is a MakeupEvent decorator
    */
    public schedule(eventType:EVENT_TYPE): any {
        return this.component?.schedule(EVENT_TYPE.MAKEUP) + " of makeup";        
        //return `Makeup Event(${super.schedule()})`;
    }

}