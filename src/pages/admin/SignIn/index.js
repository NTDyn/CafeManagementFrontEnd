import React, { useEffect } from 'react'
import Login from './SignIn'
import Footer from '../../../components/client/Home/footer-home'
import InfoPanel from '../../../components/client/Auth/infopanel'
import { useNavigate } from 'react-router-dom'

function Main() {
    // Ini digunakan untuk private route, ketika user sudah login maka tidak bisa lagi ke login page
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('@userAdmin')) {
            navigate('/admin/home')
        }
    }, [navigate])
    return (
        <main>
            <Login />
        </main>
    )
}

export default Main