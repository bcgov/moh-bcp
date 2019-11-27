const puppeteer = require('puppeteer');
const fs = require('fs');


// Load template on init and store in "global" variable for re-use.
const temlateHtmlString;
fs.readFile('template/Submission.html', 'utf8', (error, file) => {
    console.log('file loaded', error)
    if (!error){
        generateImage(file)
        templateHtmlString = file;
    }
})

async function generateImage(htmlString) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlString)
    // await page.waitFor(1000); // potnetially needed to help load images
    await page.screenshot({path: 'output/example.png', fullPage: true})
    await browser.close()
};
