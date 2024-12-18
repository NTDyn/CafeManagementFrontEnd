import { combineReducers } from 'redux';
import dataProduct from './products/index';
import dataWarehouse from './warehouse/index';
import dataProductCategory from './productCategory/index';
import sessionLogin from './userLogin'
import dataSupplier from './supplier/index';
import dataIngredientCategory from './ingredientCategory/index';
import dataIngredient from './ingredient/index';
import dataProductRecipe from './productRecipe/index';
import dataMenu from './menu';
import dataMenuDetail from './menuDetail/index'
import apiRequestReducer from './apiResult';
import BasicTabs from '../../pages/backend/RequestImport/RequestPage';
import dataBatch from './batchRecipe'
import dataCustomer from './customer/index';
import dataCustomerLevel from './customerLevel/index'
import dataSpoiled from './spoiledIngredient';
import dataStore from './storeIngedient'
import dataRecipeRaw from './recipeRaw/index';
import dataHistoryDiscount from './historyDiscount';

const rootReducer = combineReducers({

    apiRequestReducer: apiRequestReducer,
    dataProduct: dataProduct,
    dataWarehouse: dataWarehouse,
    dataProductCategory: dataProductCategory,
    dataSupplier: dataSupplier,
    sessionLogin: sessionLogin,
    dataIngredientCategory: dataIngredientCategory,
    dataIngredient: dataIngredient,
    dataProductRecipe: dataProductRecipe,
    dataMenu: dataMenu,
    dataMenuDetail: dataMenuDetail,
    dataBatch: dataBatch,
    dataCustomer: dataCustomer,
    dataCustomerLevel: dataCustomerLevel,
    dataSpoiled: dataSpoiled,
    dataStore: dataStore,
    dataRecipeRaw: dataRecipeRaw,
    dataHistoryDiscount: dataHistoryDiscount,

});

export default rootReducer;
