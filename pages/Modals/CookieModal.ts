import { expect, type Page, Locator } from '@playwright/test';
export class CookieModal{
    public page : Page;
    private modal: Locator;
    private approveCookiesButton: Locator;

    constructor(public _page){
        this.page = _page;
        this.modal = this.page.locator("#onetrust-banner-sdk");
        this.approveCookiesButton = this.page.locator("#onetrust-accept-btn-handler");
    }

    async acceptCookies(){
        await this.modal.isVisible();
        await this.approveCookiesButton.click();
    }
}

