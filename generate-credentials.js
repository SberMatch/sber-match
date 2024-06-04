const fs = require('fs');
const crypto = require('crypto-js');
const path = require("path");

const generateCredentials = () => {
    const login = process.env.LOGIN;
    const password = process.env.PASSWORD;
    const token = process.env.DADATA_TOKEN;

    if (!login || login.length < 5 || !password || password.length < 6 || !token) {
        throw new Error('Login or Password or Token not valid!');
    }

    // Шифруем логин с помощью пароля
    const CRYPTO_LOGIN = crypto.HmacSHA1(login, password).toString();
    const CRYPTO_TOKEN = crypto.AES.encrypt(token, CRYPTO_LOGIN).toString();

    fs.writeFile(path.resolve(__dirname, '.env'), `REACT_APP_CRYPTO_LOGIN=${CRYPTO_LOGIN}\nREACT_APP_CRYPTO_TOKEN=${CRYPTO_TOKEN}`, () => {})
}

generateCredentials();
