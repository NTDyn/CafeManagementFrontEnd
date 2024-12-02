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
import IngredeintCategory from './pages/backend/IngredientCategory/index';
import Ingredient from './pages/backend/Ingredient/index'
const App = () => {
  return (
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
            <ProtectedRoute role={"admin_ingredeint_categorys"}>
              <IngredeintCategory />
            </ProtectedRoute>

          } />
          <Route path="/admin/ingredient" element={<Ingredient />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
