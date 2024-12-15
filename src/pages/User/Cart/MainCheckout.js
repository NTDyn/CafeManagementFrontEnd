import React, { useEffect } from "react";
import LoginModal from "../HomeUser/Login";
import CheckoutForm from "./Checkout";
import Header from "../HomeUser/Header";
import Navbar from "../HomeUser/Navbar";
const MainCheckout=()=>{

    return (
        
        <div>
            <Navbar/>
   
          <CheckoutForm/>
        </div>
    )
}
export default MainCheckout ;