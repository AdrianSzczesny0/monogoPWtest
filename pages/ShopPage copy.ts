import { expect, type Page, Locator } from '@playwright/test';

export const Product = {
    name:'',
    price:'',
    colors:[],
    stock:'',
    description:''
};

export class ProductPage{
    public page : Page;
    

    constructor(public _page){
        this.page = _page;
    }

    async openItemDetails(item){
        const shopItem = await this.page.locator(`[data-sku="${item.sku}"]`);
        await shopItem.hover();
        await shopItem.locator(" a").first().click();
    }
}
