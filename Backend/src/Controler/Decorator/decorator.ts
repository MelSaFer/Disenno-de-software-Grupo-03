import { EVENT_TYPE } from "./EVENT_TYPE";
import { Component } from "./component";

export abstract class Decorator implements Component{
    protected component: Component | undefined;

    constructor(component: Component) {
        this.component = component;
    }

    abstract schedule(eventType: EVENT_TYPE): any;

    getComponent(): Component | undefined {
        return this.component;
    }

   

}