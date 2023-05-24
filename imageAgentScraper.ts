import puppeteer from "puppeteer";

export default class ImageAgentScraper {

    browser?: puppeteer.Browser = undefined;

    constructor() { }

    /**
     * launch the scraper browser
     */
    async launch() {
        this.browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/google-chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }

    /**
     * screape duckduckgo for images
     * @param query the image search query
     * @returns array of all result images
     */
    async getImages(query: string) {

        // check if browser was launched previously
        if (!this.browser) throw new Error("Browser not launched");

        // open a new page with duckduckgo results
        // qwant https://www.qwant.com/?l=de&q=ice+king&t=images
        const page = await this.browser.newPage();
        //await page.setJavaScriptEnabled(false);

        const url = `https://yandex.com/images/search?text=${encodeURI(query)}`;
        //const url = `https://images.search.yahoo.com/search/images?p=${encodeURI(query)}`;
        //const url = `https://www.google.com/search?q=${encodeURI(query)}&tbm=isch`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        //await page.waitFor(1000);

        // @ts-ignore
        let images = await page.evaluate(() => Array.from(document.images, e => e.src));
        //let text = await page.evaluate(() => document.body.innerHTML);
        page.close();

        // filter images
        images = images.filter(image => image != "");

        return images;
    }
}