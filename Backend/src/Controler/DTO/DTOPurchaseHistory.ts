/*
Class PurchaseHistory

*/

export class DTOPurchaseHistory{
    private id: number = 0;
    private history = [];

    public constructor(id: number, history: []) {  
        this.id = id;    
        this.history = history;
    }
}