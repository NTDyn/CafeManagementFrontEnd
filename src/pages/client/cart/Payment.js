import React, { useEffect } from 'react'
import Navbar from '../../../components/client/Navbar/Navbar'
import Footer from '../../../components/client/footer/index'
import Main from '../../../components/client/payment/main'
import { useNavigate } from 'react-router-dom'

function Payment() {
    const status = {
        Payment: "active-nav",
    }
    // Ini digunakan untuk private route, ketika user sudah login maka tidak bisa lagi ke login page
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('@userLogin')) {
            navigate('/client/login')
        }
    }, [navigate])
    return (
        <>
            <Navbar status={status} />
            <Main />
            <Footer />
        </>
    )
}

export default Payment