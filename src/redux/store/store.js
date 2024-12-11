// store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import dataReducer from '../reducers/rootReducers';

const store = createStore(
    dataReducer, applyMiddleware(thunk),
);

export { store };