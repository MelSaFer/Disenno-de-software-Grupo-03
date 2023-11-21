import { Component } from "./component";

export class Decorator implements Component{
    protected component: Component | undefined;

    constructor(component: Component) {
        this.component = component;
    }

    schedule(): string {
        return "schedule"
    }

    getComponent(): Component | undefined {
        return this.component;
    }

   

}