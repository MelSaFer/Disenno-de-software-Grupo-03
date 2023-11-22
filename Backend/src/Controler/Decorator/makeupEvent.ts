import { EVENT_TYPE } from "./EVENT_TYPE";
import { Component } from "./component";
import { Decorator } from "./decorator";

export class MakeupEvent extends Decorator{
    //private makeup: String = "None";

    public constructor(component: Component){
        super(component);
    }

    public schedule(eventType:EVENT_TYPE): any {
        return this.component?.schedule(EVENT_TYPE.MAKEUP) + " of makeup";        
        //return `Makeup Event(${super.schedule()})`;
    }

    public verifyOverlap(): boolean {
        // rango1.inicio < rango2.fin && rango1.fin > rango2.inicio;
        //if(this.component.getStartTime() < this.component.getEndTime() && this.component.getEndTime() > this.component.getStartTime())
        
        return false;
    }
}