import React from 'react'
import { Navbar, MainProduct, Footer } from '../../../components/client/product/index'

function Product() {
    // status navbar
    const status = {
        Product: "active-nav",
    }

    return (
        <>
            <Navbar status={status} />
            <MainProduct />
            <Footer />
        </>
    )
}

export default Product