import { Component } from "./component";
import { Decorator } from "./decorator";

export class DeliveryEvent extends Decorator{
    //private makeup: String = "None";

    public constructor(component: Component){
        super(component);
    }

    public schedule(): string{
        return `Delivery Event(${super.schedule()})`;
    }
}