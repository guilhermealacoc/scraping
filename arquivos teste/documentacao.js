const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

async function scrapconteudo (url,page){
  
  await page.goto(url);

  const h1 = await page.$eval(".product_main h1", h1 => h1.textContent);
  const price = await page.$eval(".price_color", price => price.textContent);
  const instock = await page.$eval(".instock.availability", instock => instock.innerText);
  
  return{
    title: h1,
    price: price,
    instock: instock
  }
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

  const todosOsLinks = await getLinks();

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const dadosRetirados = [];
  
  for(let link of todosOsLinks){
    const data = await scrapconteudo(link, page);
    await page.waitForTimeout(1000);
    dadosRetirados.push(data);  
  }

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(dadosRetirados)
  xlsx.utils.book_append_sheet(wb,ws);
  xlsx.writeFile(wb, "DocumentoFinal.xlsx");

  console.log(dadosRetirados)

  await browser.close();
}

main();