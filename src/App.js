import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/backend/Home/index';
import Product from './pages/backend/Product/index';
import SignIn from './pages/backend/SignIn/SignIn';
import Warehouse from './pages/backend/Warehouse/index';
import ProductCategory from './pages/backend/ProductCategory/index'
import Supplier from './pages/backend/Supplier/index'
import Unauthorized from './pages/backend/SignIn/Unauthorized';
import { UserProvider } from './global/UserProvider';
import ProtectedRoute from './global/ProtectedRoute ';
import IngredientCategory from './pages/backend/IngredientCategory/index';
import Ingredient from './pages/backend/Ingredient/index'
import Menu from './pages/backend/Menu/index';
import RequestImport from './pages/backend/RequestImport';
import Request from './pages/backend/CreateRequestImport/Index';
import FormRequest from './pages/backend/CreateRequestImport/AddRequest';
import ModalForm from './pages/backend/CreateRequestImport/AddRequest';
import BatchRecipe from './pages/backend/BatchRecipe';
import Customer from './pages/backend/Customer/index';
import SpoiledIngredient from './pages/backend/spoiledIngredient';
import StoreIngedient from './pages/backend/StoreIngedient';
import ProductPage from './pages/User/ProductUser/ProductList';
import HomeUser from './pages/User/HomeUser/Index';
import ProductDetail from './pages/User/ProductUser/ProductDetail';
import LoginModal from './pages/User/HomeUser/Login';
import CheckoutForm from './pages/User/Cart/Checkout';
import CartPage from './pages/User/Cart/Cart';
import ReceiptTable from './pages/backend/Receipt/Index';
import MainProductDetail from './pages/User/ProductUser/MainProductDetail';
import MainCheckout from './pages/User/Cart/MainCheckout';
import MainCart from './pages/User/Cart/MainCart';



const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            {/* <Route path="/sign-in" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/" element={
              <ProtectedRoute role={1}>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/admin/product" element={

              <ProtectedRoute role={2}>
                <Product />
              </ProtectedRoute>
            } />
            <Route path="/admin/warehouse" element={
              <ProtectedRoute role={3}>
                <Warehouse />
              </ProtectedRoute>
            } />
            <Route path="/admin/productCategory" element={
              <ProtectedRoute role={4}>
                <ProductCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/suppliers" element={
              <ProtectedRoute role={5}>
                <Supplier />
              </ProtectedRoute>

            } />
            <Route path="/admin/ingredientCategory" element={
              <ProtectedRoute role={6}>
                <IngredientCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/ingredient" element={
              <ProtectedRoute role={7}>
                <Ingredient />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute role={8}>
                <Menu />
              </ProtectedRoute>} />
            <Route path="/admin/import" element={
              <ProtectedRoute role={9}>
                <Request />
              </ProtectedRoute>} />
            <Route path="/admin/batch-recipe" element={
              <ProtectedRoute role={10}>
                <BatchRecipe />
              </ProtectedRoute>

            } />
            <Route path="/admin/spoiled-ingredient" element={
              <ProtectedRoute role={11}> <SpoiledIngredient /></ProtectedRoute>

            } />
            <Route path="/admin/store-ingredient" element={
              <ProtectedRoute role={12}><StoreIngedient /></ProtectedRoute>

            } />
            <Route path="/admin/customer" element={
              <ProtectedRoute role={13}>
                <Customer />
              </ProtectedRoute>} />
            <Route path="/admin/historyimport" element={
              <ProtectedRoute role={14}>
                <RequestImport />
              </ProtectedRoute>} /> */}



              <Route path="/sign-in" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/" element={
              <ProtectedRoute role={14}>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/admin/product" element={

              <ProtectedRoute role={14}>
                <Product />
              </ProtectedRoute>
            } />
            <Route path="/admin/warehouse" element={
              <ProtectedRoute role={14}>
                <Warehouse />
              </ProtectedRoute>
            } />
            <Route path="/admin/productCategory" element={
              <ProtectedRoute role={14}>
                <ProductCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/suppliers" element={
              <ProtectedRoute role={14}>
                <Supplier />
              </ProtectedRoute>

            } />
            <Route path="/admin/ingredientCategory" element={
              <ProtectedRoute role={14}>
                <IngredientCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/ingredient" element={
              <ProtectedRoute role={14}>
                <Ingredient />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute role={14}>
                <Menu />
              </ProtectedRoute>} />
            <Route path="/admin/import" element={
              <ProtectedRoute role={14}>
                <Request />
              </ProtectedRoute>} />
            <Route path="/admin/batch-recipe" element={
              <ProtectedRoute role={14}>
                <BatchRecipe />
              </ProtectedRoute>

            } />
            <Route path="/admin/spoiled-ingredient" element={
              <ProtectedRoute role={14}> <SpoiledIngredient /></ProtectedRoute>

            } />
            <Route path="/admin/store-ingredient" element={
              <ProtectedRoute role={14}><StoreIngedient /></ProtectedRoute>

            } />
            <Route path="/admin/customer" element={
              <ProtectedRoute role={14}>
                <Customer />
              </ProtectedRoute>} />
            <Route path="/admin/historyimport" element={
              <ProtectedRoute role={14}>
                <RequestImport />
              </ProtectedRoute>} />

              <Route path="/admin/receipt" element={
              <ProtectedRoute role={14}>
                <ReceiptTable />
              </ProtectedRoute>} />




 

{/* useruser */}
              <Route path="/user/" element={<HomeUser/>} />
              <Route path="/user/product" element={<ProductPage/>} />
              <Route path ="/user/product/:id" element={<MainProductDetail/>}/>
              <Route path ="/user/login" element={<LoginModal/>}/>
              <Route path ="/user/checkout" element={<MainCheckout/>}/>
              <Route path ="/user/cart" element={<MainCart/>}/>
          </Routes>
        </Router>
      </UserProvider>

    </>
  );
};

export default App;