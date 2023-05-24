import ImageAgentScraper from "./imageAgentScraper";
import express from "express";
import cors from "cors";

const port = 3000;

// set CORS options
const corsConfig = {
    origin: "https://skribbl.io"
};

const main = async () => {

    console.log("Starting puppeteer image scraper instance");

    // launch puppeteer chrome scraper
    const scraper = new ImageAgentScraper();
    await scraper.launch();

    console.log("Starting express server for API access");

    // init express app with cors and listen for requests on root
    const app = express();
    app.use(cors(corsConfig));
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
