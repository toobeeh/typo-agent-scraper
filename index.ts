import ImageAgentScraper from "./imageAgentScraper";
import express from "express";

const main = async () => {

    console.log("Starting puppeteer scraper instance");

    const scraper = new ImageAgentScraper();
    await scraper.launch();
    
    console.log("Starting express server for API");
    
    const app = express();
    app.get("/", (request, response) => {
        response.send(request.params);
    });
    app.listen(80);
}

main();
