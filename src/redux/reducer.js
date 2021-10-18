import { handleActions } from 'redux-actions';
import {
    loadCoinsSuccess,
    loadCoinsFailed,
} from './action';

const initialState = {
    coins: null,
};

const coinsHandler = {
    [loadCoinsSuccess]: (state, {payload}) => {
        return {...state, coins: payload, loadCoinsError: ''};
    },
    [loadCoinsFailed]: (state) => {
        return {...state, coins: null};
    },
}

export default handleActions(coinsHandler, initialState);