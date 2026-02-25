import React, { useEffect } from 'react'
import MainSignup from '../../../components/client/Auth/signup/main'
import Footer from '../../../components/client/Home/footer-home'
import InfoPanel from '../../../components/client/Auth/infopanel'
import { useNavigate } from 'react-router-dom'

function Signup() {
    // Ini digunakan untuk private route, ketika user sudah login maka tidak bisa lagi ke login page
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('@userLogin')) {
            navigate('/client/product')
        }
    }, [navigate])
    return (
        <>
            <MainSignup />
            <Footer />

        </>
    )
}

export default Signup