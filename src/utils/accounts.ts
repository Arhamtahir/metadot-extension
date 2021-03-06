import { mnemonicGenerate } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import {
    validateSeed,
    createAccountSuri,
    jsonRestore,
    exportAccount,
    validateAccount as validateAccountMessage,
    deriveAccount,
    forgetAccount,
} from '../messaging';

function GenerateSeedPhrase(): string {
    const seed = mnemonicGenerate(12);
    return seed;
}

async function validatingSeedPhrase(
    seedPhrase: string
): Promise<{ address: string; suri: string }> {
    const validated = await validateSeed(seedPhrase);
    return validated;
}

async function getJsonBackup(address: string, password: string): Promise<void> {
    try {
        const backupJson = await exportAccount(address, password);

        // ***Download JSON file***
        const fileName = 'backup';
        const data = JSON.stringify(backupJson);
        const blob = new Blob([data], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // ***Download JSON file***
    } catch (e) {
        console.log('e in backup func', e);
    }
}

// create account from seed phrase function
async function AccountCreation(
    name: string,
    password: string,
    seed: string
): Promise<boolean> {
    const account = await createAccountSuri(name, password, seed);
    return account;
}

async function createAccountFromJSON(
    json: KeyringPair$Json,
    password: string
): Promise<boolean> {
    try {
        await jsonRestore(json, password);
        return true;
    } catch (error) {
        console.log('error in json restore ==>>', error);
        return false;
    }
}
// need to invoke this function in background.js script
async function KeyringInitialization(): Promise<void> {
    // await keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });
    await keyring.loadAll({ type: 'sr25519' });
}

// derive account creation
async function derive(
    parentAddress: string,
    suri: string,
    parentPassword: string,
    name: string,
    password: string,
    genesisHash: string | null
): Promise<boolean> {
    try {
        const res = await deriveAccount(
            parentAddress,
            suri,
            parentPassword,
            name,
            password,
            genesisHash
        );
        return res;
    } catch (e) {
        throw new Error('invalid password');
    }
}

async function validateAccount(
    address: string,
    password: string
): Promise<boolean> {
    const result = await validateAccountMessage(address, password);
    return result;
}

async function deleteAccount(address: string): Promise<boolean> {
    const result = await forgetAccount(address);
    return result;
}

export default {
    GenerateSeedPhrase,
    AccountCreation,
    createAccountFromJSON,
    KeyringInitialization,
    validatingSeedPhrase,
    getJsonBackup,
    derive,
    validateAccount,
    deleteAccount,
};
