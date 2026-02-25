import React, { useEffect } from 'react'
import MainLogin from '../../../components/client/Auth/login/main'
import Footer from '../../../components/client/Home/footer-home'
import InfoPanel from '../../../components/client/Auth/infopanel'
import { useNavigate } from 'react-router-dom'

function Login() {
    // Ini digunakan untuk private route, ketika user sudah login maka tidak bisa lagi ke login page
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('@userLogin')) {
            navigate('/client/product')
        }
    }, [navigate])
    return (
        <main>
            <MainLogin />
        </main>
    )
}

export default Login