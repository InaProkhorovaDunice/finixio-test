import {getUrl, getIncreaseForCoin, getSortedCoins} from './index';

test('should return properly url', () => {
    const currency = 'EUR';
    expect(getUrl(currency)).toBe("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC&tsyms=EUR");
});

test('should return properly increase info', () => {
    const currency = 'USD';
    const openPrice = 100.78;
    const price = 80.28;
    expect(getIncreaseForCoin(price, openPrice, currency)).toBe("-20.341% ($-20.5)");
});

test('should return sorted coins', () => {
    const coins = [
        {coin: "BTC", price: 20},
        {coin: "LTC", price: 50},
        {coin: "ETH", price: 30},
    ];
    const sortedCoins = [
        {coin: "LTC", price: 50},
        {coin: "ETH", price: 30},
        {coin: "BTC", price: 20},
    ]
    const column = 'price';
    const order = 'desc';
    expect(getSortedCoins(coins, column, order)).toEqual(sortedCoins);
});

