import React, { useEffect, useState } from 'react'
import './main.css'
import Bank from "../../../image/client/yourcart/bank.svg"
import Delivery from "../../../image/client/yourcart/delivery.svg"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPayment, handlePaymentReturn } from '../../../redux/actions/payment'
import { Button } from '@mui/material';
import { addData as addReceipt } from '../../../redux/actions/receipt';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(() => {
        return JSON.parse(localStorage.getItem("@userLogin")) || {};
    });
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState(customer.customer_Address || "");
    const [phone, setPhone] = useState(customer.customer_Phone || "");
    const [paymentMethod, setPaymentMethod] = useState('');


    const urlImage = process.env.REACT_APP_BASE_URL
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (!cartData) {
            alert("Cart is empty");
            return;
        }
        const storedCart = JSON.parse(cartData) || [];
        setCart(storedCart);
    }, []);

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }

    const handleSave = () => {
        const updatedCustomer = { ...customer, customer_Address: address, customer_Phone: phone };
        setCustomer(updatedCustomer);
        localStorage.setItem("@userLogin", JSON.stringify(updatedCustomer));
        setIsEditing(false);
    };

    // Function handle payment
    const paymentHandle = async () => {
        if (!paymentMethod) {
            alert("Please select a payment method before continuing.");
            return;
        }

        // Get user
        const userData = localStorage.getItem("@userLogin");
        if (!userData) {
            Swal.fire("Please login before purchasing!", "", "warning");
            return;
        }
        const user = JSON.parse(localStorage.getItem("@userLogin"));

        // Data of receipt detail
        const receiptDetails = cart.map(item => ({
            "product_ID": item.id,
            "quantity": item.quantity,
            "price": item.price,
            "status": 1,
        }));

        const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Data of receipt
        const receiptData = {
            staff_ID: null,
            customer_ID: user.customer_Id,
            totalPrice: totalAmount,
            details: receiptDetails,
            cuppon_ID: null, // có thể thay bằng mã nếu áp dụng
            status: 1,
        };

        if (paymentMethod === "cash") {
            // Paying by cash
            receiptData.paymentMethod = 1;
            dispatch(addReceipt(receiptData));
            Swal.fire("Payment Successfull!", "", "success");
            localStorage.setItem('cart', JSON.stringify([]))
            navigate("/client/cart")
        } else {
            // Online (bank/VNPAY)
            const payload = {
                amount: totalAmount,
                orderId: Date.now().toString(),
            };
            console.log(receiptData)
            localStorage.setItem("receiptData", JSON.stringify({
                ...receiptData,
                paymentMethod: 2,
            }));

            const response = await dispatch(createPayment(payload));
            if (response?.data) {
                window.location.href = response.data; // Điều hướng đến trang thanh toán VNPAY
            }



        }

    };


    return (
        <main style={{ marginTop: '6rem' }}>
            <div className="p-5 text-white hero-payment">
                <div className="container ">
                    <div className="row">
                        {/* LEFT SIDE START */}
                        {/* Desktop */}
                        <div className="col text-center d-none d-lg-block">
                            <div className="row ">
                                <div className="col sticky-1 mt-5">

                                    {cart.length === 0 ? (
                                        <p>The cart is empty. Purchase items immediately!</p>
                                    ) : (
                                        <>
                                            <h3 className="s-3-payment" style={{ paddingBottom: '20px' }}>Order Summary</h3>
                                            {cart.map((item, index) => (
                                                <div className="row mt-5" key={index}>
                                                    <div className="col">
                                                        <img src={urlImage + item.image} alt="" style={{ width: '75%' }} />
                                                    </div>
                                                    <div className="col s-4-payment">
                                                        <p style={{ textAlign: 'start', marginLeft: '-40px' }}>
                                                            {item.name} <br />x {item.quantity} <br />{item.size}
                                                        </p>
                                                    </div>
                                                    <div className="col s-4-payment">
                                                        <p style={{ marginTop: '28px' }}> {formatCurrency(item.price * item.quantity)}</p>
                                                    </div>
                                                </div>

                                            ))}
                                        </>
                                    )}

                                    <hr style={{ opacity: '0.2', border: '0.5px solid #000000', marginTop: '35px' }} />
                                    {/* Total tagihan start */}
                                    <div className="row mt-4">
                                        <div className="col">
                                            <h3 className="s-6-payment" style={{ textAlign: 'start' }}>TOTAL</h3>
                                        </div>
                                        <div className="col">
                                            <h3 className="s-6-payment" style={{ textAlign: 'start' }}> {formatCurrency(cart.reduce((total, item) => total + (item.price * item.quantity), 0))}</h3>
                                        </div>
                                    </div>
                                    {/* Total tagihan end */}
                                </div>
                            </div>
                        </div>
                        {/* LEFT SIDE END */}
                        {/* RIGHT SIDE START */}
                        {/* Desktop */}
                        <div className="col d-none d-lg-block">
                            <div className="sticky-2 my-3" style={{ padding: '5%' }}>
                                <div className="row justify-content-between" >
                                    <div className="justify-content-end " style={{ display: 'flex', marginBottom: '1%' }}>
                                        {isEditing ? (
                                            <button className="btn btn-success btn-sm" onClick={handleSave}>Save</button>
                                        ) : (
                                            <button className="btn btn-warning btn-sm" onClick={() => setIsEditing(true)}>Adjust</button>
                                        )}
                                    </div>
                                </div>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter new address"
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter new phone number"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="s-5-payment">
                                            <b>Delivery</b> to {address || "No address available"}
                                        </p>
                                        <hr />
                                        <p className="s-5-payment">+ {phone || "No phone number"}</p>
                                    </>
                                )}
                            </div>
                            <div className="row">
                                <h3 className="s-1-payment" style={{ margin: '5% 0 0 15%', color: ' #6A4029' }}>Payment method</h3>
                                <div className="sticky-3 my-3">

                                    <div className="row">
                                        <div className="col d-flex" style={{ marginTop: '-25px' }}>
                                            <div className="form-check" style={{ padding: '45px 0px 0px 60px' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="bank"
                                                    value="bank"
                                                    checked={paymentMethod === 'bank'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                            </div>
                                            <img src={Bank} alt="logo" style={{ width: '55px', height: '50px', marginLeft: '1rem', marginTop: '35px' }} />
                                            <p className="s-4-payment" style={{ marginTop: '45px', marginLeft: '1rem' }}>Bank account</p>
                                        </div>
                                    </div>
                                    <hr style={{ opacity: '0.1', border: '0.5px solid #000000', marginTop: '10px' }} />
                                    <div className="row">
                                        <div className="col d-flex" style={{ marginTop: '-43px' }}>
                                            <div className="form-check" style={{ padding: '45px 0px 0px 60px' }}>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="cash"
                                                    value="cash"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                            </div>
                                            <img src={Delivery} alt="logo" style={{ width: '55px', height: '50px', marginLeft: '1rem', marginTop: '35px' }} />
                                            <p className="s-4-payment" style={{ marginTop: '45px', marginLeft: '1rem' }}>Cash on delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button id="btn-payment" disabled={cart.length === 0}>
                                <button className="btn btn-primary payment mt-3" onClick={paymentHandle}>Confirm and Pay</button>
                            </Button>
                        </div>

                        {/* RIGHT SIDE END */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main