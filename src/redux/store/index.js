import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import {persistStore, persistCombineReducers} from 'redux-persist';
import * as reducers from '../reducers';
import mySaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({
  timestamp: true,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  {},
  applyMiddleware(thunkMiddleware, sagaMiddleware),
);
sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);
