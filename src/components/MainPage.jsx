import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCoins } from '../redux/action';
import { getIncreaseForCoin, getIncreaseValue, getColumnName, getSortedCoins } from '../utils';
import { createSelector } from 'reselect';
import ReactTableContainer from "./ReactTableContainer";
import { currencyList } from "../config";

const selectCoinsInfo = createSelector(
    (state) => state.coins,
    (coins) => {
        if(coins) {
            return Object.keys(coins)
                .map(coin => ({
                    coin: coin,
                    price: Object.values(coins[coin])[0]['PRICE'],
                    openPrice: Object.values(coins[coin])[0]['OPENDAY'],
                }))
        } else {
            return [];
        }
    }
)

const MainPage = () => {
    const dispatch = useDispatch();
    const [currency, setCurrency] = useState('USD');
    const coins = useSelector(selectCoinsInfo);
    const [coinsInfo, setCoinsInfo] = useState([]);
    const [sortInfo, setSortInfo] = useState({column: 'priceIncrease', order: 'desc'});

    useEffect(() => {
        dispatch(loadCoins(currency))
    }, [currency]);

    const makeSort = (column, order) => {
        const updatedSortInfo = { column: column, order: order };
        setSortInfo(updatedSortInfo);
        setCoinsInfo(getSortedCoins(coinsInfo, getColumnName(column), order));
    };

    useEffect(() => {
        if(coins.length) {
            const calculatedCoinsInfo = coins.map(coin =>
                ({
                    ...coin,
                    priceIncrease: getIncreaseForCoin(coin.price, coin.openPrice, currency),
                    increaseValue: getIncreaseValue(coin.price, coin.openPrice)
                })
            );
            setCoinsInfo(getSortedCoins(calculatedCoinsInfo, 'increaseValue', 'desc'));
        }
    }, [coins, currency]);

    return (
        <div>
            <div style={{margin: '15px 20px'}}>
                <p>Specify the currency:</p>
                <select onChange={(event) => setCurrency(event.target.value)}>
                    {currencyList.map((currency, index) =>
                        <option value={currency} key={index}>{currency}</option>
                    )}
                </select>
            </div>
                {coins.length
                    ?
                    <ReactTableContainer
                        data={coinsInfo}
                        sortInfo={sortInfo}
                        makeSort={makeSort}
                        currency={currency}/>
                    :
                    <div>No data available.</div>
                }
        </div>
    );
};

export default React.memo(MainPage);
