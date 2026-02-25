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
import dataBatch from './batchRecipe'
import dataCustomer from './customer/index';
import dataCustomerLevel from './customerLevel/index'
import dataSpoiled from './spoiledIngredient';
import dataStore from './storeIngedient'
import dataRecipeRaw from './recipeRaw/index';
import dataHistoryDiscount from './historyDiscount';
import dataForcedChoice from './forcedChoice';
import dataPayment from './payment';
import dataReceipt from './receipt';
import dataChatMessage from './chatMessage';
import dataStaff from './staff';
import dataStaffGroup from './staffGroup';
import dataPermission from './permission';
import dataProductReview from './productReview';

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
    dataForcedChoice: dataForcedChoice,
    dataPayment: dataPayment,
    dataReceipt: dataReceipt,
    dataChatMessage: dataChatMessage,
    dataStaff: dataStaff,
    dataStaffGroup: dataStaffGroup,
    dataPermission: dataPermission,
    dataProductReview: dataProductReview,

});

export default rootReducer;
