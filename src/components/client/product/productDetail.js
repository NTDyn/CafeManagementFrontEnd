import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button, Container, Backdrop } from "@mui/material";
import OptionSelector from "./optionSelector";
import Grid from '@mui/material/Grid2';
import '../../../css/client/product/detailProduct.css'
import { getForcedChoice } from '../../../redux/actions/forcedChoice/index.js';
import Swal from 'sweetalert2'
import CommentProduct from './commentProduct.js';

const ProductDetailModal = ({ openDetail, handleClose, item, reviews }) => {
    const dispatch = useDispatch();
    // url backend
    const urlImage = process.env.REACT_APP_BASE_URL
    const img = `${urlImage}/${item.product_Image}`

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);

    // Load Forced choice
    const listForcedChoice = useSelector(state => state.dataForcedChoice.data);
    const [dataForcedChoice, setDataForcedChoice] = useState(listForcedChoice);

    //   const sizeOptions = dataForcedChoice.map(item => item.product);
    useEffect(() => {
        if (item?.product_ID) {
            dispatch(getForcedChoice(item.product_ID));
        }
    }, [dispatch, item?.product_ID]);

    useEffect(() => {
        setDataForcedChoice(listForcedChoice);
    }, [listForcedChoice]);

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    }

    const [cart, setCart] = useState([]);

    // Lấy giỏ hàng từ localStorage khi component mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Lưu giỏ hàng vào localStorage mỗi khi cart thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = () => {
        if (!selectedSize) {
            Swal.fire("Please choose size before adding to cart!");
            return;
        }

        const newItem = {
            id: selectedSize.product.product_ID,
            name: item.product_Name,
            image: selectedSize.product.product_Image,
            price: selectedSize.product.price, // Giá theo size đã chọn
            size: selectedSize.forcedChoice.title, // Tên size
            topping: selectedToppings.map(t => t.product.product_Name), // Danh sách topping
            quantity: 1, // Thêm thuộc tính số lượng
        };

        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingItemIndex = updatedCart.findIndex(cartItem =>
                cartItem.id === newItem.id &&
                JSON.stringify(cartItem.topping) === JSON.stringify(newItem.topping) // So sánh topping
            );

            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                updatedCart[existingItemIndex].quantity += 1;
            } else {
                // Nếu chưa có, thêm mới
                updatedCart.push(newItem);
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });

        Swal.fire("Add to cart successfully!", " ", "success");
        console.log(localStorage.getItem("cart"))
    };




    return (
        <Modal className="modal-area" open={openDetail} onClose={handleClose}
            slots={{
                backdrop: Backdrop,
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(180, 179, 179, 0.2)', // nền trắng nhạt
                        backdropFilter: 'blur(20px)', // hiệu ứng mờ,

                    },
                },
            }}
        >
            <Box className="modal-content" sx={{
                height: '800px',
                overflowY: 'auto'
            }}>
                <Grid container spacing={2}>
                    <Grid size={5} sx={{ maxHeight: '300px' }}>
                        <img src={img} style={{ width: '100%', maxHeight: '100%' }}></img>
                    </Grid>
                    <Grid size={7}>
                        <Typography className="productName">{item.product_Name}</Typography>
                        <Typography className="productPrice">
                            {formatCurrency(selectedSize ? selectedSize.product.price : item.price)} đ
                        </Typography>
                        <Box sx={{ padding: '1%', overflowY: 'scroll' }}>
                            <Container maxWidth="sm" sx={{ padding: "24px" }}>
                                <OptionSelector title="Choose size (compulsory)" options={dataForcedChoice} multiple={false} onSelect={setSelectedSize} />

                            </Container>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'end', }}>
                    <Button id="add_cart_btn" onClick={addToCart}>Add to cart</Button>
                </Box>
                <CommentProduct
                    reviews={reviews}
                ></CommentProduct>

            </Box>

        </Modal>
    );
};

export default ProductDetailModal;
