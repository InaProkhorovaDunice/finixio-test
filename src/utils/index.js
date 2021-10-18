import round from 'lodash.round';
import sortBy from "lodash.sortby";
import { apiUrl, coinsList } from '../config';

export const getUrl = (currency) => {
    return `${apiUrl}?fsyms=${coinsList}&tsyms=${currency}`;
};

export const getIncreaseForCoin = (price, openPrice, currency) => {
    const priceIncrease = round(price - openPrice, 2);
    const priceIncreasePercent = round(priceIncrease * 100 / openPrice, 3);
    return `${priceIncreasePercent}% (${getCurrencySymbol(currency)}${priceIncrease})`;
};

export const getIncreaseValue = (price, openPrice) => {
    return round(price - openPrice, 2);
};

export const getSortedCoins = (coins, column, order) => {
    return sortBy(coins, (coin) => order === 'asc' ? coin[column] : -coin[column])
};

export const getColumnName = (column) => {
    return column !== 'priceIncrease' ? column : 'increaseValue'
};

export const changeSortOrder = (order) => {
    return order === 'desc' ? 'asc' : 'desc';
};

export const getCurrencySymbol = (currency) => {
  return (0).toLocaleString('en-ru',
      { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
      .replace(/\d/g, '').trim();
};