/*
Class PurchaseHistory

*/

import {Purchase} from "./Purchase"

export class PurchaseHistory{
    private id: number = 0;
    private history: Purchase[] = [];

    public constructor(id: number, history: Purchase[]) {     
        this.id = id; 
        this.history = history;
    }
}