import {Purchase} from "./Purchase"

class PurchaseHistory{
    private history: Purchase[] = [];

    public constructor(history: Purchase[]) {      
        this.history = history;
    }
}