/*
Class PurchaseHistory

*/

import {Purchase} from "./Purchase"

export class PurchaseHistory{
    private history: Purchase[] = [];

    public constructor(history: Purchase[]) {      
        this.history = history;
    }
}