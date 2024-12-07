// store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import dataReducer from '../reducers/rootReducers';
import apiRequestReducer from "../reducers/apiResult";

const store = createStore(
    dataReducer, applyMiddleware(thunk),


);


export { store };