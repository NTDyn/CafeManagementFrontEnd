import { combineReducers } from 'redux';
import dataProduct from './products/index';

const rootReducer = combineReducers({
    dataProduct: dataProduct,
});

export default rootReducer;
