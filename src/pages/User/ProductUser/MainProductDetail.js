import React, { useEffect } from "react";
import ProductDetail from "./ProductDetail";
import LoginModal from "../HomeUser/Login";
import Header from "../HomeUser/Header";
import Navbar from "../HomeUser/Navbar";

const MainProductDetail=()=>{

    return (
        
        <div>
            <Navbar/>
          <ProductDetail/>
        </div>
    )
}
export default MainProductDetail ;