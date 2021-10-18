import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux'
import saga from './redux/saga';
import reducer from './redux/reducer'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default store