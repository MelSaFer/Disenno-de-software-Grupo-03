import { AdminContent } from "./AdminContent";
import { AdminHistory } from "./AdminHistory";
import { AdminCart } from "./AdminCart";
import { AdminProduct } from "./AdminProduct";
import { AdminUser } from "./AdminUser";
import { AdminPurchase } from "./AdminPurchase";
import { AdminCategory } from "./AdminCategory";


export class MainController{
    private AdminCart: AdminCart | undefined;
    private AdminProduct: AdminProduct | undefined;
    private AdminUser: AdminUser | undefined;
    private AdminPurchase: AdminPurchase | undefined;
    private AdminCategory: AdminCategory | undefined;
    private AdminContent: AdminContent | undefined;
    private AdminHistory: AdminHistory | undefined;

    constructor(){}

}
