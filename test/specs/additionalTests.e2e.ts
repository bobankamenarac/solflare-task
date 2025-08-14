import { expect } from '@wdio/globals'
import { RecoveryPage } from '../pageobjects/recoveryPage'
import { TEST_DATA } from '../data/test-data';
const logger = require('../../logger');

/*
    Intention of this file was to add some negative checks and to try copy/paste functionality
    in the recovery process. It is not meant to be a complete test suite, but rather a demonstration
    of how to handle some specific scenarios in the recovery process.
*/

describe('Additional tests', () => {

    // Instantiate page objects
    const recoveryPage = new RecoveryPage

    it('Should check if passing wrong recovery phrase will not enable button', async () => {

        logger.info('Starting the recovery process');
        await recoveryPage.open()
        logger.info('Application is opened successfully');

        await recoveryPage.clickOnNeedWalletButton()

        // At the moment of writing this test, recovery phrase list had 12 items
        expect(await recoveryPage.getRecoverCodeListSize()).toBe(TEST_DATA.numberOfPhrases)
        
        const recoveryItemsValues = await recoveryPage.getRecoveryPhraseItemsValues()

        logger.info('Recovery items values:', recoveryItemsValues)
        let wrongRecoveryPhrase = recoveryItemsValues.map(item => item + 'wrong');

        await recoveryPage.clickSaveRecoveryPhraseButton()

        await recoveryPage.fillRecoveryPhraseItems(wrongRecoveryPhrase)

        await recoveryPage.assertContinueButtonToBeEnabled()
        await recoveryPage.clickContinueButton()

        await recoveryPage.assertInvalidRecoveryPhraseMessageIsDisplayed()

        await recoveryPage.assertContinueButtonToBeDisabled()
    
    })

    it('Should check if repeated passoword is not the same as password', async () => {
        logger.info('Starting the recovery process');
        await recoveryPage.open()
        logger.info('Application is opened successfully');

        await recoveryPage.clickOnNeedWalletButton()

        // At the moment of writing this test, recovery phrase list had 12 items
        expect(await recoveryPage.getRecoverCodeListSize()).toBe(12)
        
        const recoveryItemsValues = await recoveryPage.getRecoveryPhraseItemsValues()

        logger.info('Recovery items values:', recoveryItemsValues)

        await recoveryPage.clickSaveRecoveryPhraseButton()

        await recoveryPage.fillRecoveryPhraseItems(recoveryItemsValues)

        await recoveryPage.assertContinueButtonToBeEnabled()
        await recoveryPage.clickContinueButton()

        await recoveryPage.assertContinueButtonToBeDisabled()

        await recoveryPage.fillPassword(TEST_DATA.password)
        await recoveryPage.fillRepeatPassword(TEST_DATA.wrongPassword) 

        await recoveryPage.assertContinueButtonToBeEnabled()
        await recoveryPage.clickContinueButton()

        await recoveryPage.assertInvalidRepeatPasswordMessageIsDisplayed()

    })

    it('Should copy phrase and then paste them', async () => {
        
        logger.info('Starting the recovery process');
        await recoveryPage.open()
        logger.info('Application is opened successfully');

        await recoveryPage.clickOnNeedWalletButton()

        // At the moment of writing this test, recovery phrase list had 12 items
        expect(await recoveryPage.getRecoverCodeListSize()).toBe(12)

        await recoveryPage.clickCopyButton()
        await recoveryPage.clickSaveRecoveryPhraseButton()
        await recoveryPage.assertContinueButtonToBeDisabled()

        await recoveryPage.clickPasteButton()
        await recoveryPage.assertContinueButtonToBeEnabled()
        await recoveryPage.clickContinueButton()

        await recoveryPage.assertPasswordToBeVisible()
    })
})