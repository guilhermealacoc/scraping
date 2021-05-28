const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://books.toscrape.com/");


  await browser.close();
})();
