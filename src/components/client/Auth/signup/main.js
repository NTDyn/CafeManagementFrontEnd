import React, { useState } from 'react'
import '../login/main.css'
import { Link, useNavigate } from 'react-router-dom'
import CoffeeLogo from "../../../../image/client/coffeeLogo.svg"
import GoogleLogo from "../../../../image/client/login/googleLogo.svg"
import { useDispatch } from 'react-redux';
import { addData as addCustomer } from "../../../../redux/actions/customer"
import Swal from 'sweetalert2'
function MainSignup() {
    const dispatch = useDispatch();
    const url = process.env.REACT_APP_HOST
    const [signupForm, setSignupForm] = useState({
        customer_Name: '',
        customer_Point: 0,
        level_ID: 1,
        username: '',
        password: '',
        customer_Phone: '',
        customer_Address: ''
    })
    const [validate, setValidate] = useState({ error: false, message: '' })
    const navigate = useNavigate()

    const handleSignup = async (event) => {
        event.preventDefault()

        if (!validateForm()) return;
        try {
            await dispatch(addCustomer(signupForm))
            Swal.fire("Sign up successful!", "", "success");
            // Optionally reset form or navigate to login page
            navigate('/client/login');
        } catch (error) {
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
            setValidate({ error: true, message: 'Failed to sign up. Please try again.' });
        }
    }

    const validateForm = () => {
        if (!signupForm.customer_Name || !signupForm.username || !signupForm.password || !signupForm.customer_Phone || !signupForm.customer_Address) {
            setValidate({ error: true, message: 'Please fill in all the fields.' });
            return false;
        }
        if (!/^\d{10}$/.test(signupForm.customer_Phone)) {
            setValidate({ error: true, message: 'Invalid phone number format.' });
            return false;
        }

        return true;
    }


    return (
        <main>
            <div className="row" style={{ marginBottom: '2%' }}>
                {/* LEFT SIDE */}
                <div className="col d-none d-lg-block">
                    <div className=" text-white hero-auth" />
                </div>
                {/* RIGHT SIDE */}
                <div className="col">
                    <div className="row">
                        <div className="col">
                            {/* navbar start */}
                            {/* desktop version */}
                            <div className="container mt-2 d-none d-lg-block">
                                <nav className="navbar navbar-expand-lg my-4">
                                    <div className="container-fluid">
                                        <Link to="/client/home" className="navbar-brand">
                                            <img src={CoffeeLogo} alt="logo" className="pb-2" />
                                            <p className="d-inline ps-2 s-lg-auth">DYN COFFEE</p>
                                        </Link>
                                        <Link to="/client/login">
                                            <div className="btn btn-warning signup-nav rounded-pill px-4 py-2 s-md-auth" style={{ fontSize: '16px' }}><p style={{ marginTop: '2px' }}>Login</p></div>
                                        </Link>
                                    </div>
                                </nav>
                            </div>

                            {/* navbar end */}
                        </div>
                    </div>
                    <div className="container w-75">
                        <div className="row">
                            <div className="col text-center form-title-auth ">
                                <h3>Sign Up</h3>
                            </div>
                        </div>
                        {/* FORM START */}
                        <form onSubmit={handleSignup} name="signUpForm">
                            {validate.error && (
                                <div className="alert alert-danger" role="alert" style={{ borderRadius: '15px', marginTop: '-2rem' }}>
                                    {validate.message}
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label s-md-auth">Name :</label>
                                <input name="nameCustomer" type="text" className="form-control py-3" id="nameCustomerSignUp" placeholder="Enter your name"
                                    onChange={(e) => setSignupForm({
                                        ...signupForm,
                                        customer_Name: e.target.value
                                    })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label s-md-auth">Phone Number :</label>
                                <input name="mobileNumber" type="tel" className="form-control py-3" id="mobileNumberSignUp" placeholder="Enter your phone number"
                                    onChange={(e) => setSignupForm({
                                        ...signupForm,
                                        customer_Phone: e.target.value
                                    })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label s-md-auth"> Address :</label>
                                <input name="address" type="text" className="form-control py-3" id="addressSignUp" placeholder="Enter your address"
                                    onChange={(e) => setSignupForm({
                                        ...signupForm,
                                        customer_Address: e.target.value
                                    })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label s-md-auth">Username :</label>
                                <input name="username" type="text" className="form-control py-3" id="usernameSignUp" placeholder="Enter your username"
                                    onChange={(e) => setSignupForm({
                                        ...signupForm,
                                        username: e.target.value
                                    })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label s-md-auth">Password :</label>
                                <input name="password" type="password" className="form-control py-3" id="passwordSignUp" placeholder="Enter your password"
                                    onChange={(e) => setSignupForm({
                                        ...signupForm,
                                        password: e.target.value
                                    })} />
                            </div>

                            <div className="mb-3 form-check" />
                            {/* desktop version */}
                            <input type="submit" value="Sign Up" className="btn btn-warning auth rounded-4 s-lg-auth py-2 input-signup d-none d-lg-block" style={{ fontSize: '20px', justifySelf: 'center' }} />

                        </form>
                        {/* FORM END */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainSignup