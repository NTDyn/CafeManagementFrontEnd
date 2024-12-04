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
const App = () => {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/" element={
              <ProtectedRoute role={"admin_home"}>
                <Home />
              </ProtectedRoute>

            } />
            <Route path="/admin/product" element={
              <ProtectedRoute role={"admin_product"}>
                <Product />
              </ProtectedRoute>
            } />
            <Route path="/admin/warehouse" element={
              <ProtectedRoute role={"admin_warehouse"}>
                <Warehouse />
              </ProtectedRoute>
            } />
            <Route path="/admin/productCategory" element={
              <ProtectedRoute role={"admin_product_category"}>
                <ProductCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/suppliers" element={
              <ProtectedRoute role={"admin_suppliers"}>
                <Supplier />
              </ProtectedRoute>

            } />
            <Route path="/admin/ingredientCategory" element={
              <ProtectedRoute role={"admin_ingredient_categorys"}>
                <IngredientCategory />
              </ProtectedRoute>
            } />
            <Route path="/admin/ingredient" element={
              <ProtectedRoute role={"admin_ingredient"}>
                <Ingredient />
              </ProtectedRoute>
            } />
            <Route path="/admin/menu" element={
              <ProtectedRoute role={"admin_menu"}>
                <Menu />
              </ProtectedRoute>} />
          </Routes>
        </Router>
      </UserProvider>

    </>
  );
};

export default App;
