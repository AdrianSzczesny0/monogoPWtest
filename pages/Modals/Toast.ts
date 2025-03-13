import { expect, type Page, Locator } from '@playwright/test';

export enum Status{
    SUCCESS = 1,
    FAIL = 2
}

export class Toast{
    public page : Page;
    private toast: Locator;
    private successIcon: Locator;
    private warningIcon: Locator;
    private toastMessage: Locator;

    constructor(public _page){
        this.page = _page;
        this.successIcon = this.page.locator('[data-name="UiCheckCircleIcon"]').first();
        this.warningIcon = this.page.locator('[data-name="UiWarningSolidIcon"]').first();
        this.toastMessage = this.page.locator('[role="status"]').first();
    }
    
    async verifyToastWithMessage(status:Status, message:string){
        switch (status) {
            case Status.SUCCESS:
                await this.successIcon.waitFor({state:"visible"});
                break;
        
            case Status.FAIL:
                await this.warningIcon.waitFor({state:"visible"});
                break;
                
            default:
                await this.successIcon.waitFor({state:"visible"});
                break;
        }
        await this.toastMessage.waitFor({state:"visible"});
        expect(await this.toastMessage.textContent()).toContain(message)
    }
}

