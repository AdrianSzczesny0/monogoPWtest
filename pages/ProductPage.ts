import { expect, type Page, Locator } from '@playwright/test';

export const Product = {
    name:'',
    price:'',
    colors:[],
    stock:'',
    description:''
};

export class ProductPage{
    public page: Page;
    public productDetailsSection: Locator;
    public productName: Locator;
    public productPrice: Locator;
    public productAddToCart: Locator;
    public productSelectedColor: Locator;
    public productStockInfo: Locator;
    public productDescription: Locator;
    

    constructor(public _page){
        this.page = _page;
        this.productDetailsSection = this.page.locator('.aem-productDetails__productInfo');
        this.productName = this.productDetailsSection.locator('h1');
        this.productPrice = this.productDetailsSection.locator('[data-testid="finalPrice"] span');
        this.productAddToCart = this.productDetailsSection.locator('[data-testid="pdpAddToProduct"]');
        this.productSelectedColor = this.productDetailsSection.locator('.color-selector ~span');
        this.productStockInfo = this.productDetailsSection.locator('[data-testid="inStockBlock"] span');
        this.productDescription = this.productDetailsSection.locator('[data-testid="descriptionBlock"] p');
    }

    async getProductInfo(){
        const shopItem = {
            name: await this.productName.textContent(),
            price: await this.productPrice.textContent(),
            selectedColor: await this.productSelectedColor.textContent(),
            stockInfo: await this.productStockInfo.textContent(),
            description: await this.productDescription.textContent()
        }
        return shopItem;
    }
    async verifyProductDetailsPageLoaded(){
        await this.productName.waitFor({state:"visible"});
        await this.productPrice.waitFor({state:"visible"});
        await this.productAddToCart.waitFor({state:"visible"});
        await this.productSelectedColor.waitFor({state:"visible"});
        await this.productStockInfo.waitFor({state:"visible"});
        await this.productDescription.waitFor({state:"visible"});
    }

    async addToCard(){
        await this.productAddToCart.click();
    }
}
