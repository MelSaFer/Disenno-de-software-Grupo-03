import { Component } from "./component";

export abstract class Decorator implements Component{
    protected component: Component | undefined;

    constructor(component: Component) {
        this.component = component;
    }

    abstract schedule(): any;

    getComponent(): Component | undefined {
        return this.component;
    }

   

}