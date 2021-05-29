const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

async function getPageData (url,page){
  
  await page.goto(url);

  const h1 = await page.$eval(".product_main h1", h1 => h1.textContent);
  const price = await page.$eval(".price_color", price => price.textContent);
  const instock = await page.$eval(".instock.availability", instock => instock.innerText);
  
  return{
    title: h1,
    price: price,
    instock: instock
  }
  //await browser.close();
};

async function getLinks(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://books.toscrape.com/");

  const links = await page.$$eval(
    ".product_pod .image_container a",
    (allAs) => allAs.map((a) => a.href)
  );

  await browser.close();
  return links;
}


async function main(){

  const allLinks = await getLinks();

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  for(let link of allLinks){
    const data = await getPageData(link, page)
    console.log(data)
  }

}

main();