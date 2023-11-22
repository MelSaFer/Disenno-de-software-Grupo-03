import { Component } from "./component";
import { Decorator } from "./decorator";

export class DeliveryEvent extends Decorator{
    //private makeup: String = "None";

    public constructor(component: Component){
        super(component);
    }

    public schedule(): any {
        return this.component?.schedule() + " of delivery";        
        //return `Makeup Event(${super.schedule()})`;
    }
}