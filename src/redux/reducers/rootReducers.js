import { combineReducers } from 'redux';
import dataProduct from './products/index';
import dataWarehouse from './warehouse/index';
import dataProductCategory from './productCategory/index';

const rootReducer = combineReducers({
    dataProduct: dataProduct,
    dataWarehouse: dataWarehouse,
    dataProductCategory: dataProductCategory,

});

export default rootReducer;
