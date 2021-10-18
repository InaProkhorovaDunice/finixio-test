import { createActions } from 'redux-actions';

import {
    LOAD_COINS,
    LOAD_COINS_SUCCESS,
    LOAD_COINS_FAILED,
} from './constants';

export const {
    loadCoins,
    loadCoinsSuccess,
    loadCoinsFailed,
    setCurrency,
} = createActions(
    LOAD_COINS,
    LOAD_COINS_SUCCESS,
    LOAD_COINS_FAILED,
);