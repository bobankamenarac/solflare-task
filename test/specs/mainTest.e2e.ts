import { expect } from '@wdio/globals'
import { RecoveryPage } from '../pageobjects/recoveryPage'
import { MainPage } from '../pageobjects/mainPage'
import { testData } from '../data/test-data';

const logger = require('../../logger');


describe('My Login application and adding Wallet', () => {

    // Instantiate page objects
    const recoveryPage = new RecoveryPage
    const mainPage = new MainPage

    it('Should login to application and add wallets', async () => {

        logger.info('Starting the recovery process');
        await recoveryPage.open()
        logger.info('Application is opened successfully');

        await recoveryPage.clickOnNeedWalletButton()

        // At the moment of writing this test, recovery phrase list had 12 items
        
        expect(await recoveryPage.getRecoverCodeListSize()).toBe(testData.numberOfPhrases)
        
        const recoveryItemsValues = await recoveryPage.getRecoveryPhraseItemsValues()

        logger.info('Recovery items values:', recoveryItemsValues)

        await recoveryPage.clickSaveRecoveryPhraseButton()

        await recoveryPage.fillRecoveryPhraseItems(recoveryItemsValues)

        await recoveryPage.assertContinueButtonToBeEnabled()
        await recoveryPage.clickContinueButton()

        await recoveryPage.assertContinueButtonToBeDisabled()

        await recoveryPage.fillPassword(testData.password)
        await recoveryPage.fillRepeatPassword(testData.password) 

        await recoveryPage.assertContinueButtonToBeEnabled()
        await recoveryPage.clickContinueButton()

        await recoveryPage.clickExploreSolanaButton()
        logger.info('Successfully completed the recovery process and clicked on Explore Solana button');

        logger.info('Main page and section wallet picker');

        await mainPage.clickOnWalletPicker()

        // If user is new on first login only one wallet will be displayed
        expect(await mainPage.getLengthOfAccountsRecoveryPhrase()).toBe(1)
        await mainPage.assertMainWalletNameToBeDisplayed()

        await mainPage.clickAddWalletButton()

        await mainPage.waitForManageRecoveryPhraseButtonToBeDisplayed()
        await mainPage.clickManageRecoveryPhraseButton()

        logger.info('Check state of the first recovery phrase checkbox');
        await mainPage.assertRecoveryPhraseCheckboxIsChecked(0)
        await mainPage.assertRecoveryPhraseCheckboxIsDisabled(0)

        await mainPage.assertRecoveryPhraseCheckboxIsNotChecked(2)
        await mainPage.assertRecoveryPhraseCheckboxIsNotChecked(3)

        await mainPage.checkRecoveryPhraseCheckbox(2)
        await mainPage.checkRecoveryPhraseCheckbox(3)

        await mainPage.assertRecoveryPhraseCheckboxIsChecked(2)
        await mainPage.assertRecoveryPhraseCheckboxIsChecked(3)

        await mainPage.clickSaveButton()

        logger.info('Waiting for request to be completed after clicking Save button');
        
        // Here we are waiting for 'portfolio/balances/sync' request to be completed and to return 200 as status code
        browser.expectRequest('OPTIONS', 'portfolio/balances/sync', 200)

        expect(await mainPage.getLengthOfAccountsRecoveryPhrase()).toBe(3)
        await mainPage.assertMainWalletNameToBeDisplayed()

        await mainPage.assertSecondWalletNameToBeDisplayed()
        await mainPage.assertThirdWalletNameToBeDisplayed()

    })
})