import React, { useEffect } from "react";
import CartPage from "./Cart";
import LoginModal from "../HomeUser/Login";
import Header from "../HomeUser/Header";
import Navbar from "../HomeUser/Navbar";
const MainCart=()=>{

    return (
        
        <div>
            <Navbar/>
     
          <CartPage/>
        </div>
    )
}
export default MainCart ;