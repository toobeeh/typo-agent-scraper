import ImageAgentScraper from "./imageAgentScraper";
import express from "express";

const port = process.env.PORT || 3000;

const main = async () => {

    console.log("Starting puppeteer scraper instance");

    const scraper = new ImageAgentScraper();
    await scraper.launch();
    
    console.log("Starting express server for API access");
    
    const app = express();
    app.get("/:query", async (request, response) => {

        const query = request.params.query;
        const scrapeURLS = await scraper.getImages(query)
        response.send(scrapeURLS);
    });
    app.listen(port);
}

main();
