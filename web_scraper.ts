import { Builder, By, WebDriver } from 'selenium-webdriver';

const mainUrl = 'https://www.qemu.org/';

async function discoverWebsiteStructure(url: string): Promise<string[]> {
    const driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(url);
        const links = await driver.findElements(By.tagName('a'));
        const pageLinks: string[] = [];
        for (const link of links) {
            const href = await link.getAttribute('href');
            //after we commented it endlesly downloading some stuff
            if (href && href.startsWith(url)) {
                pageLinks.push(href);
            }
        }
        return pageLinks;
    } finally {
        await driver.quit();
    }
}

async function isPageConnected(driver: WebDriver, fromPage: string, toPage: string): Promise<boolean> {
    await driver.get(fromPage);
    const links = await driver.findElements(By.tagName('a'));
    for (const link of links) {
        const href = await link.getAttribute('href');
        if (href === toPage) {
            return true;
        }
    }
    return false;
}

async function composeInterconnectionMatrix(pages: string[]): Promise<string[][]> {
    const matrix: string[][] = [];
    const driver: WebDriver = await new Builder().forBrowser('chrome').build();
    try {
        for (const page1 of pages) {
            const row: string[] = [];
            for (const page2 of pages) {
                if (page1 === page2) {
                    row.push('N/A');
                } else {
                    const isConnected = await isPageConnected(driver, page1, page2);
                    row.push(isConnected ? 'Y' : 'N');
                }
            }
            matrix.push(row);
        }
        return matrix;
    } finally {
        await driver.quit();
    }
}

discoverWebsiteStructure(mainUrl).then((pages) => {
    console.log('Discovered pages:', pages);
    composeInterconnectionMatrix(pages).then((matrix) => {
        console.log('Interconnection Matrix:');
        console.table(matrix);
    });
});