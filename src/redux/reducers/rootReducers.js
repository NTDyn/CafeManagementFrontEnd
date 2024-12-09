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
import apiRequestReducer from './apiResult';
import BasicTabs from '../../pages/backend/RequestImport/RequestPage';

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
    dataMenu: dataMenu
   

});

export default rootReducer;
