import puppeteer from 'puppeteer-core';

export default async function urlSS(url) {
    try {
        // TAKE SCREENSHOT OF LIVE URL

        console.log('in');
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`
        });

        console.log('browser', browser);

        const page_desktop = await browser.newPage();
        const page_mobile = await browser.newPage();
        const page_tablet = await browser.newPage();

        // Adjust the viewport size if needed
        await page_desktop.setViewport({ width: 1920, height: 1080 });
        await page_mobile.setViewport({ width: 390, height: 844 });
        await page_tablet.setViewport({ width: 768, height: 1024 });

        // Navigate to the provided URL
        const navigationPromise_des = page_desktop.waitForNavigation();
        const navigationPromise_mob = page_mobile.waitForNavigation();
        const navigationPromise_tab = page_tablet.waitForNavigation();
        await page_desktop.goto(url);
        await page_mobile.goto(url);
        await page_tablet.goto(url);

        await navigationPromise_des;
        await navigationPromise_mob;
        await navigationPromise_tab;

        // Wait for 3 second to make sure animations are completed in the page
        await delay(3000);

        // Generate the screenshot
        const desktop_screenshot = await page_desktop.screenshot({
            encoding: 'base64',
            quality: 10,
            type: 'jpeg'
        });
        const mobile_screenshot = await page_mobile.screenshot({
            encoding: 'base64',
            quality: 10,
            type: 'jpeg'
        });
        const tablet_screenshot = await page_tablet.screenshot({
            encoding: 'base64',
            quality: 10,
            type: 'jpeg'
        });

        // Close the browser
        await browser.close();

        return {
            desktop_screenshot,
            mobile_screenshot,
            tablet_screenshot
        };
    } catch (error) {
        return { error: error.message };
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
