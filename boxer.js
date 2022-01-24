const puppeteer = require('puppeteer');
const feminine = require('./store/feminine.names');
const masculine = require('./store/masculine.names');

const limit = 1001;
const Jackpass = 'EUWZ';

(async () => {
    const browser = await puppeteer.launch();
    for (let index = 0; index < limit; index++) {
        const firstNameList = Math.random() > 0.5 ? masculine : feminine;
        const lastNameList = Math.random() > 0.5 ? masculine : feminine;
        const page = await browser.newPage();
        await page.goto('https://jackbox.tv/', {
            waitUntil: 'networkidle2',
        });
        await page.type('#roomcode', Jackpass);
        await page.type('#username', `${firstNameList[randomIntFromInterval({min: 0, max: firstNameList.length - 1})]} ${lastNameList[randomIntFromInterval({min: 0, max: lastNameList.length - 1})]}sen`);
        await page.waitForTimeout(200)
        await page.click('#button-join');
    }

    //await browser.close();
})();

function randomIntFromInterval({min, max}) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}