import { Box, Grid2 } from "@mui/material";
import { useState, useEffect } from "react";
import './main.css'
import { Grid } from "@mui/joy";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from "reactstrap";
import { useNavigate } from 'react-router-dom'


const CartPage = () => {
    const urlImage = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate()

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (!cartData) {
            return;
        }
        const storedCart = JSON.parse(cartData) || [];
        setCart(storedCart);
    }, []);

    const updateQuantity = (index, amount) => {
        const updatedCart = cart.map((item, i) =>
            i === index ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }

    return (
        <main style={{ marginTop: '6rem' }}>
            <div className="p-5  cart-contain">
                <div className="container ">
                    <Box className="p-4 max-w-2xl mx-auto">
                        <h2 className="text-xl font-bold mb-4" >CART</h2>
                        {cart.length === 0 ? (
                            <p>The cart is empty. Purchase items immediately!</p>
                        ) : (
                            <>
                                <Box>
                                    {/* Tiêu đề các cột */}
                                    <Grid container spacing={2} className="table-header" >
                                        <Grid xs={2}></Grid>
                                        <Grid xs={3}>Product</Grid>
                                        <Grid xs={1}> Size</Grid>
                                        <Grid xs={2}> Quality</Grid>
                                        <Grid xs={2}>Price </Grid>
                                        <Grid xs={1}> </Grid>
                                    </Grid>
                                    {/* Hiển thị sản phẩm trong giỏ hàng */}
                                    {cart.map((item, index) => (
                                        <Grid container spacing={2} key={index} sx={{ textAlign: "center" }} className="cart-item">
                                            <Grid xs={2}>
                                                <img className="product-img" src={urlImage + item.image}></img>
                                            </Grid>
                                            <Grid xs={3}>
                                                {item.name}
                                            </Grid>
                                            <Grid xs={1}>
                                                {item.size}
                                            </Grid>
                                            <Grid xs={2}>
                                                <button onClick={() => updateQuantity(index, -1)} className="px-2 minusQuality"><RemoveIcon /></button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(index, 1)} className="px-2 addQuality"><AddIcon /></button>

                                            </Grid>
                                            <Grid xs={2}>
                                                {formatCurrency(item.price * item.quantity)} đ
                                            </Grid>
                                            <Grid xs={1}>
                                                <button onClick={() => removeItem(index)} className="ml-4 text-red-500" id="btn-remove"><DeleteForeverIcon /></button>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Box>

                                {/* Hiển thị tổng tiền giỏ hàng */}
                                <Box sx={{ justifyContent: 'end', display: "flex", marginTop: '5%' }}>
                                    <Grid container sx={{ width: '50%' }}>
                                        <Grid xs={5} sx={{ fontWeight: 'bold' }}>Total:</Grid>
                                        <Grid xs={5}>{formatCurrency(cart.reduce((total, item) => total + (item.price * item.quantity), 0))} đ</Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ justifyContent: 'end', display: "flex", marginTop: '5%' }}>
                                    <Grid container sx={{ width: '50%' }}>
                                        <Button onClick={() => navigate("/client/payment")}>Checkout Now</Button>
                                    </Grid>
                                </Box>

                            </>
                        )}
                    </Box>
                </div>
            </div>
        </main >
    );
};

export default CartPage;
