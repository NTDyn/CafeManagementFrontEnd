import React from 'react'
import './main.css'
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginClient } from '../../../../redux/actions/userLogin'

import CoffeeLogo from "../../../../image/client/coffeeLogo.svg"
import GoogleLogo from "../../../../image/client/login/googleLogo.svg"
import Swal from 'sweetalert2'

function MainLogin() {
    const dispatch = useDispatch();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const [validate, setValidate] = useState({ error: false, message: '' })
    const navigate = useNavigate()



    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const response = await dispatch(loginClient(loginForm));
            if (response.status === 200) {
                localStorage.setItem('@userLogin', JSON.stringify(response.data))
                navigate('/client/home')
            } else {
                Swal.fire("Username or password is wrong. Please check again!", "", "error");
            }
        } catch (error) {
            setValidate({ error: true, message: error.message })
        }
    }

    return (
        <div className="row">
            {/* LEFT SIDE */}
            <div className="col d-none d-lg-block container-bg">
                <div className=" text-white hero-auth" />
            </div>
            {/* RIGHT SIDE */}
            <div className="col">
                <div className="row">
                    <div className="col">
                        {/* navbar start */}
                        <div className="container mt-5 d-none d-lg-block">
                            <nav className="navbar navbar-expand-lg my-4">
                                <div className="container-fluid">
                                    <Link to="/client/home" className="navbar-brand">
                                        <img src={CoffeeLogo} alt="logo" className="pb-2" />
                                        <p className="d-inline ps-2 s-lg-auth">DYN COFFEE</p>
                                    </Link>
                                    <Link to="/client/signup">
                                        <div className="btn btn-warning signup-nav rounded-pill px-4 py-2 s-md-auth" style={{ fontSize: '16px' }}><p style={{ marginTop: '2px' }}>Sign Up</p></div>
                                    </Link>
                                </div>
                            </nav>
                        </div>

                        {/* navbar end */}
                    </div>
                </div>
                <div className="container w-75">
                    <div className="row">
                        <div className="col text-center form-title-auth pt-5">
                            <h3>Login</h3>
                        </div>
                    </div>
                    {/* FORM START */}
                    <form onSubmit={handleLogin} name="loginForm">
                        {validate.error && (
                            <div className="alert alert-danger" role="alert" style={{ borderRadius: '15px', marginTop: '-2rem' }}>
                                {validate.message}
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label s-md-auth">User name :</label>
                            <input name="username" type="text" className="form-control py-3" aria-describedby="emailHelp" placeholder="Enter your user name"
                                onChange={(e) => setLoginForm({
                                    ...loginForm,
                                    username: e.target.value
                                })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label s-md-auth">Password :</label>
                            <input name="password" type="password" className="form-control py-3" placeholder="Enter your password"
                                onChange={(e) => setLoginForm({
                                    ...loginForm,
                                    password: e.target.value
                                })} />
                        </div>
                        <div className="mb-3 form-check">
                        </div>
                        <div className="row">
                            <div className="col">
                                <Link to="/client/forgotpassword" className="s-lg-auth"><p style={{ marginTop: '-45px' }}><u>Forgot password?</u></p></Link>
                            </div>
                        </div>
                        <input type="submit" value="Login" className="btn btn-warning auth rounded-4 s-lg-auth py-4 input-login d-lg-block d-none" style={{ fontSize: '20px', justifySelf: 'center' }} />


                    </form>
                    {/* FORM END */}
                </div>
            </div>
        </div>
    )
}

export default MainLogin