export const CRYPTO_LOGIN = process.env.REACT_APP_CRYPTO_LOGIN!;
export const CRYPTO_TOKEN = process.env.REACT_APP_CRYPTO_TOKEN!;

if (!CRYPTO_LOGIN || !CRYPTO_TOKEN) {
    throw new Error('Разработчик не сгенерировал credentials!');
}
