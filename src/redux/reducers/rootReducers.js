import { combineReducers } from 'redux';
import dataProduct from './products/index';
import dataWarehouse from './warehouse/index';
import dataProductCategory from './productCategory/index';
import dataSupplier from './supplier/index'
import sessionLogin from './userLogin'

const rootReducer = combineReducers({
    dataProduct: dataProduct,
    dataWarehouse: dataWarehouse,
    dataProductCategory: dataProductCategory,
    dataSupplier: dataSupplier,
    sessionLogin: sessionLogin

});

export default rootReducer;
