import { expect, type Page, Locator } from '@playwright/test';
export class HomePage{
    public page : Page;
    private shopNavButton: Locator;
    private avatarIcon:Locator;

    constructor(public _page){
        this.page = _page;
        this.shopNavButton = this.page.locator('[data-testid="headerItem-0"]');
        this.avatarIcon = this.page.locator('[data-testid="headerLoginButton"]');
    }

    async hoverOverAvatar(){
        await this.avatarIcon.hover();
    }

    async goToShopPage(){
        await this.shopNavButton.click();
        await this.hoverOverAvatar();
    }
}