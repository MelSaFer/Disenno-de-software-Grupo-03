/*
Class PurchaseHistory

*/

import { Purchase } from "./Purchase";

export class PurchaseHistory{
    private history: Purchase[] = [];

    //-------------------------------
    public PurchaseHistory( history: Purchase[]){
        this.history = history;
    }

    //-------------------------------
    public getHistory(): Purchase[]{
        return this.history;
    }
    public setHistory( history: Purchase[]): void{
        this.history = history;
    }

}
