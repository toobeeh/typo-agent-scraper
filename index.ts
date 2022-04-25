import ImageAgentScraper from "./imageAgentScraper";
import express from "express";

// get heroku port
const port = process.env.PORT || 3000;

const main = async () => {

    console.log("Starting puppeteer scraper instance");

    // launch puppeteer chrome scraper
    const scraper = new ImageAgentScraper();
    await scraper.launch();
    
    console.log("Starting express server for API access");
    
    // init express app and listen for requests on root
    const app = express();
    app.get("/:query", async (request, response) => {

        // get query fromurl param and scrape images
        const query = request.params.query;
        const scrapeURLS = await scraper.getImages(query)

        // respond with scraped URLS
        response.send(scrapeURLS);
    });

    // start listening
    app.listen(port);
}

main();
