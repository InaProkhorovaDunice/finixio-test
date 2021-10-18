import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getUrl } from '../utils';
import { LOAD_COINS } from './constants';
import {
    loadCoinsSuccess,
    loadCoinsFailed,
} from './action';

function* loadCoinsInfo(data) {
    try {
        const response = yield call(axios.get, getUrl(data.payload));
        yield put(loadCoinsSuccess(response.data?.RAW));
    } catch (error) {
        yield put(loadCoinsFailed());
    }
}

export default function* createCoinsWatcher() {
    yield takeEvery(LOAD_COINS, loadCoinsInfo);
}
