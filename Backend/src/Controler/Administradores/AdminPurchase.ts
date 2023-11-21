import { Observer } from '../Observer/Observer';
import { Subject } from '../Observer/Subject';
import { API_URL } from '../config';

export class AdminPurchase {
    private observers: Observer[] = [];
    private state: any = null;
    
    constructor() {}

    setState(state: any): void {
        this.state = state;
    }

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) this.observers.splice(index, 1);
    }

    notify(): void {
        for (const observer of this.observers) observer.update(this);
    }
}