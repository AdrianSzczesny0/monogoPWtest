import { expect, type Page } from '@playwright/test';

export class Utility {
    public page:Page;
    constructor(page:Page){
        this.page = page;
    }

    async verifyLinks(){
        const links = this.page.locator('a');
        const allLinks = await links.all();
        const allHrefs = await Promise.all(
            allLinks.map((link) => link.getAttribute("href"))
        )
        const allValidHrefs = allHrefs.reduce((links, link) =>{
            expect.soft(link, `${link} is not invalid link`).toBeTruthy();

            if(link && !link.startsWith('test'))
                links.add(new URL(link, this.page.url()).href)
            return links
        }, new Set<string>())
        return allValidHrefs
    }

    async verifyImagesLoaded(){
        const images = await this.page.$$('img');
        const imagesLoaded = await Promise.all(images.map(async (image) => {
            return await image.evaluate(img => img.complete && img.naturalWidth > 0);
        }));
        expect(imagesLoaded.length).toBe(images.length);
    }
}