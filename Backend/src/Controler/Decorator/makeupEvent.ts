import { Component } from "./component";
import { Decorator } from "./decorator";

export class MakeupEvent extends Decorator{
    //private makeup: String = "None";

    public constructor(component: Component){
        super(component);
    }

    public schedule(): string {
        return `Makeup Event(${super.schedule()})`;
    }
}