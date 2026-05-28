import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  console.log("WAITING 5 SECONDS...");
  await new Promise(r => setTimeout(r, 5000));
  
  const rootHTML = await page.evaluate(() => document.getElementById('root').innerHTML);
  if (rootHTML.length < 10000) {
    console.log("ROOT LENGTH AFTER 5S:", rootHTML.length);
  }

  await browser.close();
})();
