import puppeteer from "puppeteer";

export default class ImageAgentScraper{

    browser?: puppeteer.Browser = undefined;

    constructor(){ }

    /**
     * launch the scraper browser
     */
    async launch(){
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    /**
     * screape duckduckgo for images
     * @param query the image search query
     * @returns array of all result images
     */
    async getImages(query: string){

        // check if browser was launched previously
        if(!this.browser) throw new Error("Browser not launched");

        // open a new page with duckduckgo results
        const page = await this.browser.newPage();
        await page.goto(`https://duckduckgo.com/?q=${encodeURI(query)}&t=h_&iax=images&ia=images`, {waitUntil: 'domcontentloaded'});
        await page.waitFor(1000);
        let images = await page.evaluate(() => Array.from(document.images, e => e.src));
        page.close();

        // filter images
        images = images.filter(image => image != "");

        return images;
    }
}