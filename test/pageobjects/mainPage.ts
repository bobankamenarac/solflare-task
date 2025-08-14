import Page from './page';
import { TEST_DATA } from '../data/test-data';

export class MainPage extends Page {

    /*
       Define selectors for elements on the main page
    */
    public get sectionWalletPicker() {
        return $('span=Main Wallet');
    }
    public get accountsRecoveryPhrase() {
        return $$('[data-testid^="li-wallets-"]');
    }

    public get mainWalletName() {
           return $(`div=${TEST_DATA.mainWalletName}`)
    }

    public get secondWalletName() {
        return $(`div=${TEST_DATA.secondWalletName}`)   
    }

    public get thirdWalletName() {
        return $(`div=${TEST_DATA.thirdWalletName}`)   
    }

    public get addWalletButton() {
        return $('[data-testid="icon-btn-add"]');
    }

    public get manageRecoveryPhraseButton() {
        return $('[data-testid="li-add-wallet-mnemonic-manage"]'); 
    }

    public get recoveryPhraseCheckbox() {
        return $$('[data-testid^="tgl-li-wallets-"]');
    }

    public get saveButton() {
        return $('[data-testid="btn-save"]');
    }


    /*
        Methods to interact with the recovery page
    */
    async clickOnWalletPicker(): Promise<void> {
        await this.sectionWalletPicker.click()      
    }

    async getLengthOfAccountsRecoveryPhrase(): Promise<number> {    
        return this.accountsRecoveryPhrase.length
    }

    async assertMainWalletNameToBeDisplayed(): Promise<void> {
        expect(await this.mainWalletName.isDisplayed()).toBe(true);
    }

    async clickAddWalletButton(): Promise<void> {
        await this.addWalletButton.click()
    }   

    async waitForManageRecoveryPhraseButtonToBeDisplayed(): Promise<void> {
        await this.manageRecoveryPhraseButton.waitForDisplayed({ timeout: 5000});
    }

    async clickManageRecoveryPhraseButton(): Promise<void> {
        await this.manageRecoveryPhraseButton.click()
    }

    async assertRecoveryPhraseCheckboxIsChecked(index: number): Promise<void> {
        await this.recoveryPhraseCheckbox[index].isSelected();
    }

    async assertRecoveryPhraseCheckboxIsDisabled(index: number): Promise<void> {
        expect(await this.recoveryPhraseCheckbox[index].isEnabled()).toBe(false);
    }

    async assertRecoveryPhraseCheckboxIsNotChecked(index: number): Promise<void> {
        expect(await this.recoveryPhraseCheckbox[index].isSelected()).toBe(false);
    }

    async checkRecoveryPhraseCheckbox(index: number): Promise<void> {
       if(!await this.recoveryPhraseCheckbox[index].isSelected()) {
            await this.recoveryPhraseCheckbox[index].click();
        }
    }
    
    async clickSaveButton(): Promise<void> {
        await this.saveButton.click()
    }

    async assertSecondWalletNameToBeDisplayed(): Promise<void> {
        expect(await this.secondWalletName.isDisplayed()).toBe(true);
    }

    async assertThirdWalletNameToBeDisplayed(): Promise<void> {
        expect(await this.thirdWalletName.isDisplayed()).toBe(true);
    }
}