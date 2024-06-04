import crypto from 'crypto-js';
import { CRYPTO_LOGIN } from '../constants';

export const getAESEncryptedValue = (value: string) => {
    return crypto.AES.encrypt(value, CRYPTO_LOGIN).toString();
}

export const getAESDecryptedValue = (value: string) => {
    const bytes  = crypto.AES.decrypt(value, CRYPTO_LOGIN);
    return bytes.toString(crypto.enc.Utf8);
}

export const getHmacSHA1EncryptedValue = (value: string) => {
    return crypto.HmacSHA1(value, CRYPTO_LOGIN).toString();
}
