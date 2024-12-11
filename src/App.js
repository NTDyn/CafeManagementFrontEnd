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
import BasicTabs from './pages/backend/RequestImport/RequestPage';
import RequestImport from './pages/backend/RequestImport';
import Request from './pages/backend/CreateRequestImport/Index';
import BatchRecipe from './pages/backend/BatchRecipe';
import Customer from './pages/backend/Customer/index'
const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
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
              <ProtectedRoute role={"9"}>
                <Request />
              </ProtectedRoute>} />
            <Route path="/admin/batch-recipe" element={
              <BatchRecipe />
            } />

            <Route path="/admin/customer" element={
              <ProtectedRoute role={10}>
                <Customer />
              </ProtectedRoute>} />


          </Routes>
        </Router>
      </UserProvider>

    </>
  );
};

export default App;
