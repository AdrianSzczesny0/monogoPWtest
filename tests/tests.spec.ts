import { Browser, BrowserContext, Page, chromium, expect} from '@playwright/test';
import { test } from '../fixture.ts';
import {ShopItem} from '../testData/ShopItems.ts'
import { Product } from '../pages/Product.ts';
import { Status } from '../pages/Modals/Toast.ts';
import { ENV, environment } from '../playwright.config.ts';
import { On } from '../pages/on.ts';


test.describe('Shopt test cases', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let on: On;
    let env = ENV[`${environment}`];


    test.beforeAll(async () => {
      browser = await chromium.launch();
      context = await browser.newContext();
    });


    test('TC 1 - Verify if it is possible to add a product to the cart', async () => { 
      page = await context.newPage();
      on = new On(page);
      const expectedProduct = new Product("Ploom X Advanced Rose Shimmer","1","£29.00");

      await test.step("Open Ploom Site" , async () => {
        await page.goto(env.BASE_URL);
      });

      await test.step("Close initial windows", async () =>{
        await on.CookieModal.acceptCookies();
        await on.AgeConsentModal.acceptConsent();
      });

      await test.step("Search and add product to cart", async () =>{
        await on.HomePage.goToShopPage();
        await on.ShopPage.openItemDetails(ShopItem.PloomXAdventure);
        await on.ProductPage.verifyProductDetailsPageLoaded();
        await on.ProductPage.addToCard();
        await on.Toast.verifyToastWithMessage(Status.SUCCESS,'Product added to cart');
        await on.MiniCart.verifyMiniCartDisplayed();
      });

      await test.step("Validation", async () =>{
        const cartItems = await on.MiniCart.getItemList();
        expect(cartItems.at(0)).toEqual(expectedProduct);
        expect(await on.MiniCart.getItemAmountInBasket()).toBe(1);
      });

    });

    test('TC 2 - Verify if it is possible to remove a product from the cart.', async () => { 
      await on.MiniCart.verifyMiniCartDisplayed();
      await on.MiniCart.removeItemFromListByID(0);
      await on.MiniCart.verifyCartIsEmpty();
      await context.close();
    });

    test('TC 3 - Verify if there are any broken links or images on the product page.', async ({on}) => { 
      await test.step("Open Ploom Site" , async () => {
        await on.page.goto(env.BASE_URL);
      });

      await test.step("Close initial windows", async () =>{
        await on.CookieModal.acceptCookies();
        await on.AgeConsentModal.acceptConsent();
      });

      await test.step("Go to Shop and open one of the product details", async () =>{
        await on.HomePage.goToShopPage();
        await on.ShopPage.openItemDetails(ShopItem.PloomXAdventure);
        await on.ProductPage.verifyProductDetailsPageLoaded();
      });

      await test.step("Verify links on page work", async () =>{
        console.log(await on.Utility.verifyLinks());
      });
    });
    
});