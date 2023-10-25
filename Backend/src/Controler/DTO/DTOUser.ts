/*
Class User

*/

export class DTOUser {
    private userId: number = 0;
    private roleType = 0;
    private cart = [];

    //-------------------------------
    public constructor( userId: number, roleType: any, cart: any){
        this.userId = userId;
        this.roleType = roleType;
        this.cart = cart;
    }
    

}