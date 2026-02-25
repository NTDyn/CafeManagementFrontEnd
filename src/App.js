import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/admin/Home/index';
import Product from './pages/admin/Product/index';
import SignIn from './pages/admin/SignIn/index';
import Warehouse from './pages/admin/Warehouse/index';
import ProductCategory from './pages/admin/ProductCategory/index'
import Supplier from './pages/admin/Supplier/index'
import Unauthorized from './pages/admin/SignIn/Unauthorized';
import { UserProvider } from './global/UserProvider';
import ProtectedRoute from './global/ProtectedRoute ';
import IngredientCategory from './pages/admin/IngredientCategory/index';
import Ingredient from './pages/admin/Ingredient/index'
import Menu from './pages/admin/Menu/index';
import BatchRecipe from './pages/admin/BatchRecipe';
import Customer from './pages/admin/Customer/index';
import SpoiledIngredient from './pages/admin/spoiledIngredient';
import StoreIngedient from './pages/admin/StoreIngedient';
import ReceiptTable from './pages/admin/Receipt/Index';
import Importing from './pages/admin/Importing/index';
import ClientHome from './pages/client/Home/Home.js'
import ClientLogin from './pages/client/Auth/Login.js'
import ClientProduct from './pages/client/product/Product.js'
import Order from './pages/client/order/Order.js'
import Payment from './pages/client/cart/Payment.js';
import Cart from './pages/client/cart/Cart.js';
import Profile from './pages/client/profile/Profile.js';
import Chat from './pages/client/chat/Chat.js';
import History from './pages/client/history/History.js'
import Staff from './pages/admin/Staff/index.js'
import PaymentResult from './components/client/payment/paymentResult.js';
import ClientSignUp from './pages/client/Auth/Signup.js'

const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/admin/sign-in" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/admin/home" element={
              <ProtectedRoute role={1}>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/admin/product" element={

              <ProtectedRoute role={1}>
                <Product />
              </ProtectedRoute>
            } />
            <Route path="/admin/warehouse" element={
              <ProtectedRoute role={1}>
                <Warehouse />
              </ProtectedRoute>
            } />
            <Route path="/admin/productCategory" element={
              <ProtectedRoute role={1}>
                <ProductCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/suppliers" element={
              <ProtectedRoute role={1}>
                <Supplier />
              </ProtectedRoute>

            } />
            <Route path="/admin/ingredientCategory" element={
              <ProtectedRoute role={1}>
                <IngredientCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/ingredient" element={
              <ProtectedRoute role={1}>
                <Ingredient />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute role={1}>
                <Menu />
              </ProtectedRoute>} />
            <Route path="/admin/batch-recipe" element={
              <ProtectedRoute role={1}>
                <BatchRecipe />
              </ProtectedRoute>

            } />
            <Route path="/admin/spoiled-ingredient" element={
              <ProtectedRoute role={1}> <SpoiledIngredient /></ProtectedRoute>

            } />
            <Route path="/admin/store-ingredient" element={
              <ProtectedRoute role={1}><StoreIngedient /></ProtectedRoute>

            } />
            <Route path="/admin/customer" element={
              <ProtectedRoute role={1}>
                <Customer />
              </ProtectedRoute>} />

            <Route path="/admin/staff" element={
              <ProtectedRoute role={1}>
                <Staff />
              </ProtectedRoute>} />

            <Route path="/admin/receipt" element={
              <ProtectedRoute role={1}>
                <ReceiptTable />
              </ProtectedRoute>} />
            <Route path="/admin/import" element={
              <ProtectedRoute role={1}>
                <Importing />
              </ProtectedRoute>
            } />


            <Route path="/client/home" element={<ClientHome />} />
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/signup" element={<ClientSignUp />} />
            <Route path="/client/product" element={<ClientProduct />} />
            <Route path='/client/product/detail/:id' element={<Order />} />
            <Route path='/client/payment' element={<Payment />} />
            <Route path='/client/cart' element={<Cart />} />
            <Route path='/client/profile' element={<Profile />} />
            <Route path="/client/chat" element={<Chat />} />
            <Route path="/client/history" element={<History />} />
            <Route path="/client/paymentResult" element={<PaymentResult />} />
          </Routes>

        </Router>

      </UserProvider>
    </>
  );
};

export default App;