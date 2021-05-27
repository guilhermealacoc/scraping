const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://books.toscrape.com/");

  const links = await page.$$eval(
    ".product_pod .image_container a",
    (allAs) => allAs.map((a) => a.href)
  );

  //console.log(links)

  const aoaLinks = links.map(l => [l]);
  //console.log(allAslinks)  
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(aoaLinks);
  xlsx.utils.book_append_sheet(wb, ws);
  xlsx.writeFile(wb, "links.xlxs");

  await browser.close();
})();
