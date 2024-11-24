import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/backend/Home/Home';
import Product from './pages/backend/Product/index';
import SignIn from './pages/backend/SignIn/SignIn';
import Warehouse from './pages/backend/Warehouse/index';
import ProductCategory from './pages/backend/ProductCategory/index'
import Supplier from './pages/backend/Supplier/index';
import IngredeintCategory from './pages/backend/IngredientCategory/index';
import Ingredient from './pages/backend/Ingredient/index'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/admin/warehouse" element={<Warehouse />} />
        <Route path="/admin/productCategory" element={<ProductCategory />} />
        <Route path="/admin/suppliers" element={<Supplier />} />
        <Route path="/admin/ingredientCategory" element={<IngredeintCategory />} />
        <Route path="/admin/ingredient" element={<Ingredient />} />
      </Routes>
    </Router>
  );
};

export default App;
