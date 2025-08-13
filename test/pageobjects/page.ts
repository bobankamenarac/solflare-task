import { browser } from '@wdio/globals'

/**
* Main page object containing all methods, selectors and functionalities
* that are shared across all page objects
*/
export default class Page {

    public open () {
        return browser.url(``)
    }

    public async waitForElementToBeDisplayed(selector: WebdriverIO.Element): Promise<void> {
        await selector.waitForDisplayed({ timeout: 10000 })
    }

    


}