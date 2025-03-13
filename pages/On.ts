import { Page } from "@playwright/test";
import { HomePage } from "./HomePage";
import { AgeConsentModal } from "./Modals/AgeConsentModal";
import { CookieModal } from "./Modals/CookieModal";
import { MiniCart } from "./Modals/MiniCart";
import { Toast } from "./Modals/Toast";
import { ProductPage } from "./ProductPage";
import { ShopPage } from "./ShopPage";

export class On{
    HomePage: HomePage;
    CookieModal: CookieModal;
    AgeConsentModal: AgeConsentModal;
    ShopPage: ShopPage;
    ProductPage: ProductPage;
    MiniCart: MiniCart;
    Toast: Toast;
    constructor(page:Page){
        this.HomePage = new HomePage(page);
        this.CookieModal = new CookieModal(page);
        this.AgeConsentModal = new AgeConsentModal(page);
        this.ShopPage = new ShopPage(page);
        this.ProductPage = new ProductPage(page);
        this.MiniCart = new MiniCart(page);
        this.Toast = new Toast(page);
    }
}