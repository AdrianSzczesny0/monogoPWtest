import { expect, type Page, chromium, Browser, BrowserContext } from '@playwright/test';
import { test as baseTest } from '@playwright/test';
import { HomePage } from './pages/HomePage.ts';
import { CookieModal } from './pages/Modals/CookieModal.ts';
import { AgeConsentModal } from './pages/Modals/AgeConsentModal.ts';
import { ShopPage } from './pages/ShopPage.ts';
import { ProductPage } from './pages/ProductPage.ts';
import { MiniCart } from './pages/Modals/MiniCart.ts';
import { Toast } from './pages/Modals/Toast.ts';
import { Utility } from './pages/Utility.ts';

type MyFixtures = {
    on: {
        HomePage: HomePage;
        page: Page;
        CookieModal: CookieModal;
        AgeConsentModal: AgeConsentModal;
        ShopPage: ShopPage;
        ProductPage: ProductPage;
        MiniCart: MiniCart;
        Toast: Toast;
        Utility: Utility;
    };
};

const test = baseTest.extend<MyFixtures>({
    on: async ({ page }, use) => {
        const homePage = new HomePage(page);
        const cookieModal = new CookieModal(page);
        const ageConsetModal = new AgeConsentModal(page);
        const shopPage = new ShopPage(page);
        const productPage = new ProductPage(page);
        const miniCart = new MiniCart(page);
        const toast = new Toast(page);
        const utility = new Utility(page);
        
        await use({ 
            HomePage: homePage, 
            page: page, 
            CookieModal: cookieModal, 
            AgeConsentModal: ageConsetModal,
            ShopPage: shopPage,
            ProductPage: productPage, 
            MiniCart: miniCart, 
            Toast: toast,
            Utility: utility 
        });
    },
});

export { test };