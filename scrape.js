const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [69,70,71,72,73,74,75,76,77,78];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for tables to load
    await page.waitForSelector("table");

    // Get all numbers inside tables
    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => Number(cell.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a + b, 0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();