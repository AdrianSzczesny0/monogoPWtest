import { expect, type Page, Locator } from '@playwright/test';
import { Product } from '../Product';
export class MiniCart{
    public page : Page;
    private modal: Locator;
    private cartSubtotal: Locator;
    private cartItemList;
    private cartChecoutButton:Locator;
    private emptyCartMessage:Locator;
    private basketCount:Locator;


    constructor(public _page){
        this.page = _page;
        this.modal = this.page.locator('[data-testid="mini-cart-header"]');
        this.cartSubtotal = this.modal.locator('[data-testid="miniCartSubtotal"] span');
        this.cartItemList = this.modal.locator('[data-variant="card-variant1"]');
        this.cartChecoutButton = this.modal.locator('[data-testid="miniCartCheckoutButton"]');
        this.emptyCartMessage = this.modal.locator('[data-testid="emptyCartContainer"]');
        this.basketCount = this.modal.locator('div[data-testid]').first();
    }

    async getItemAmountInBasket(){
        let amount = await this.basketCount.textContent();
        return Number(amount?.split(' ')[0]);
    }

    async verifyMiniCartDisplayed(){
        await this.modal.waitFor({state:"visible"});
        await this.cartSubtotal.waitFor({state:"visible"});
        await this.cartChecoutButton.waitFor({state:"visible"});
    }
    
    async removeItemFromListByID(ID:number){
        const item  = await this.modal.locator('[data-variant="card-variant1"]').nth(ID);
        item.locator('[data-testid="cartRemoveButton"]').click();
    }

    async verifyCartIsEmpty(){
        await this.emptyCartMessage.waitFor({state:"visible"});
        const cartItemCount = await this.getItemAmountInBasket();
        expect(cartItemCount).toBe(0);
        // additionaly we could add a check for the messagfe in the cart. however this would have to be driven by env lang setting.
        // the check below will only work for ENG site version. we are asserting certain text for cart.
        expect(await this.emptyCartMessage.textContent()).toContain('There are no products in your cart at the moment');
    }

    async getListCount(){
        const itemListAmount = await this.modal.locator('[data-variant="card-variant1"]').count();
        return itemListAmount;
    }

    async getItemDetails(item:Locator){
        return {
            name: await item.locator('strong').textContent(),
            price: await item.getByText('£').textContent(),  // Here the '£' could be defined by env and its localization, to user proper currenct per localization
            quantity: await item.locator('[data-testid="cartQuantity"]').getAttribute('value')
        }
    }

    async getItemByID(ID:number){
        const item  = await this.modal.locator('[data-variant="card-variant1"]').nth(ID);
        const productDetails = await this.getItemDetails(item);
        return new Product(productDetails.name, productDetails.quantity, productDetails.price);
    }

    async getItemList(){
        let itemList = new Array();
        const itemListAmount = await this.getListCount();
        for (let i = 0; i < itemListAmount; i++) {
            const item = await this.getItemByID(i);
            await itemList.push(item);
        }
        return itemList;
    }
}

