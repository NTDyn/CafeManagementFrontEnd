import React, { useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Banner from "./Banner";
import ProductPage from "../ProductUser/ProductList";
import LoginModal from "./Login";
import MenuText from "./textMenu";
const HomeUser=()=>{

    return (
        
        <div>
            <Header/>
            <LoginModal/>
            <Navbar/>
            <Banner/>
          <MenuText/>
            <ProductPage/>
        </div>
    )
}
export default HomeUser ;