import { expect, type Page, Locator } from '@playwright/test';
export class AgeConsentModal{
    public page : Page;
    private modal: Locator;
    private acceptButton: Locator;

    constructor(public _page){
        this.page = _page;
        this.modal = this.page.locator(".modal__mainContent");
        this.acceptButton = this.page.locator(".ageconfirmation__confirmBtn");
    }
    
    async acceptConsent(){
        await this.modal.isVisible();
        await this.acceptButton.click();
    }
}

