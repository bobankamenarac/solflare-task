import { $ } from '@wdio/globals';
import Page from './page';
import { testData } from '../data/test-data';

export class RecoveryPage extends Page {

    /*
     Define selectors for elements on the recovery page
    */
    public get getNeedWalletButton() {
        return $('[data-testid="btn-need-new-wallet"]');
    }

    public get continueButton() {
        return $('[data-testid="btn-continue"]');
    }

    public get passwordInput() {
        return $('[data-testid="input-new-password"]');
    }

    public get repeatPasswordInput() {
        return $('[data-testid="input-repeat-password"]');
    }

    public get recoveryPhraseList() {
        return $('[data-testid="section-mnemonic-field"]')
    }

    // Dynamic selector for recovery phrase items
    public recoveryPhraseItems(index: number) {
        return $(`[data-testid^="input-recovery-phrase-${index}"]`);
    }

    public get saveRecoveryPhraseButton() {
        return $('[data-testid="btn-saved-my-recovery-phrase"]');
    }

    public get exploreSolanaButton() {
        return $('[data-testid="btn-explore"]');
    }

    public get invalidRecoveryPhraseMessage() {
         return $(`span=${testData.invalidRecoveryPhraseMessage}`);
    }

    public get invalidRepeatPasswordMessage() {
        return $(`span=${testData.invalidRepeatPasswordMessage}`);
    }

    public get copyButton() {
        return $('[data-testid="btn-copy"]');
    }

    public get pasteButton() {
        return $('[data-testid="btn-paste"]');
    }

    /*
     Methods to interact with the recovery page
    */
    public async clickOnNeedWalletButton(): Promise<void> {
        await this.getNeedWalletButton.click()
    }

    public async getRecoverCodeListSize(): Promise<number> {
        return this.recoveryPhraseList.$$('input').length
    }

    public async getRecoveryPhraseItemsValues(): Promise<Array<string>>  {
        let recoveryPhraseList: Array<string> = []
        const listSize = await this.getRecoverCodeListSize()
        for(let i = 0; i < listSize; i++) {
            recoveryPhraseList.push(await this.recoveryPhraseItems(i+1).getValue())
        }
        return recoveryPhraseList
    }

    public async fillRecoveryPhraseItems(recoveryPhrase: Array<string>): Promise<void> {
        for(let i = 0; i < recoveryPhrase.length; i++) {
            await this.recoveryPhraseItems(i+1).setValue(recoveryPhrase[i])
        }
    }

    public async clickSaveRecoveryPhraseButton(): Promise<void> {
        await this.saveRecoveryPhraseButton.click()
    }

    public async assertContinueButtonToBeEnabled(): Promise<void> {
        expect(await this.continueButton.isEnabled()).toBe(true)
    }

    public async assertContinueButtonToBeDisabled(): Promise<void> {
        expect(await this.continueButton.isEnabled()).toBe(false)
    }

    public async clickContinueButton(): Promise<void> {
        await this.continueButton.click()
    }

    public async fillPassword(password: string): Promise<void> {
        await this.passwordInput.setValue(password)
    }

    public async fillRepeatPassword(repeatPassword: string): Promise<void> {
        await this.repeatPasswordInput.setValue(repeatPassword)
    }

    public async clickExploreSolanaButton(): Promise<void> {
        await this.exploreSolanaButton.click()
    }

    public async assertInvalidRecoveryPhraseMessageIsDisplayed(): Promise<void> {
        expect(await this.invalidRecoveryPhraseMessage.isDisplayed()).toBe(true)
    }

    public async assertInvalidRepeatPasswordMessageIsDisplayed(): Promise<void> {
        expect(await this.invalidRepeatPasswordMessage.isDisplayed()).toBe(true)
    }

    public async clickCopyButton(): Promise<void> {
        await this.copyButton.click()
    }

    public async clickPasteButton(): Promise<void> {
        await this.pasteButton.click()
    }

    public async assertPasswordToBeVisible(): Promise<void> {
        expect(await this.passwordInput.isDisplayed()).toBe(true)
    }

}