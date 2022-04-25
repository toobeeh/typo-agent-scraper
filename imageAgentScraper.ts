import puppeteer from "puppeteer";

export default class ImageAgentScraper{

    browser?: puppeteer.Browser = undefined;

    constructor(){ }

    async launch(){
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    async getImages(query: string){

        if(!this.browser) throw new Error("Browser not launched");

        const page = await this.browser.newPage();
        await page.goto(`https://duckduckgo.com/?q=${encodeURI(query)}&t=h_&iax=images&ia=images`, {waitUntil: 'domcontentloaded'});
        await page.waitFor(1000);
        const images = await page.evaluate(() => Array.from(document.images, e => e.src));
        page.close();
        return images;
    }
}