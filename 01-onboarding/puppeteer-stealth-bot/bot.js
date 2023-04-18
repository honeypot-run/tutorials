const puppeteer = require('puppeteer-extra')
const {executablePath} = require('puppeteer')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


// puppeteer usage as normal
puppeteer.launch({ headless: true, executablePath: executablePath(), }).then(async browser => {
  console.log('Running bot')
  const page = await browser.newPage()
  await page.goto('http://127.0.0.1:3000/index.html', {
    waitUntil: 'networkidle0'
  });
  await browser.close()
  console.log(`All done ✨`)
})
