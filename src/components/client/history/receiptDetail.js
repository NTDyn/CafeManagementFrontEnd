import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Grid } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData as getProduct } from '../../../redux/actions/products';
import { addReview } from '../../../redux/actions/productReview';
import Swal from 'sweetalert2'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const formatDateTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const formatCurrency = (number) => {
    return number.toLocaleString('vi-VN');
};

function ReceiptDetail({ open, handleClose, receipt }) {
    const listProduct = useSelector(state => state.dataProduct.data);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('@userLogin')));
    const [comment, setComment] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
    }, []);

    const getProductName = (id) => {
        const product = listProduct.find(p => p.product_ID === id);
        return product ? product.product_Name : `#${id}`;
    };

    // ⭐ Quản lý đánh giá từng sản phẩm nếu cần
    const [ratings, setRatings] = useState({});

    const handleRatingChange = (productId, value) => {
        setRatings(prev => ({
            ...prev,
            [productId]: value
        }));
    };

    const handleSubmitRating = async () => {

        const missingRatings = receipt.details.filter(item => !ratings[item.product_ID]);

        if (missingRatings.length > 0) {
            Swal.fire("Please rate all products!", "", "info");
            return;
        }

        const rating = Object.entries(ratings).map(([product_ID, rating]) => ({
            product_ID: Number(product_ID),
            rating
        }));

        const data = {
            user_ID: user.customer_Id,
            ratingList: rating,
            order_ID: receipt.receipt_ID,
            comment: comment
        }
        await dispatch(addReview(data))
        Swal.fire("Thank you for your rating!", "", "success")

    };


    if (!receipt) return null;

    return (
        <Modal open={open} onClose={handleClose} >
            <Box sx={style}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', marginBottom: '2%' }}>Receipt Detail</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={5}><strong>Receipt Number:</strong></Grid>
                    <Grid item xs={7}>{receipt.receipt_ID}</Grid>

                    <Grid item xs={5}><strong>Total:</strong></Grid>
                    <Grid item xs={7}>{formatCurrency(receipt.totalPrice)} đ</Grid>

                    <Grid item xs={5}><strong>Created Date:</strong></Grid>
                    <Grid item xs={7}>{formatDateTime(receipt.createdDate)}</Grid>

                    <Grid item xs={5}><strong>Products:</strong></Grid>
                </Grid>

                <Box sx={{ border: '1px solid', mt: 1 }}>
                    {/* Header */}
                    <Grid container sx={{ textAlign: 'center', borderBottom: '1px solid', fontWeight: 'bold' }}>
                        <Grid xs={1}>#</Grid>
                        <Grid xs={5}>Tên sản phẩm</Grid>
                        <Grid xs={2}>Số lượng</Grid>
                        <Grid xs={2}>Giá</Grid>
                        {receipt.status === 4 && <Grid xs={2}>Đánh giá</Grid>}
                    </Grid>

                    {/* Dòng dữ liệu */}
                    {receipt.details?.map((item, index) => (
                        <Grid container key={index} sx={{ textAlign: 'center', borderBottom: '1px groove', alignItems: 'center' }}>
                            <Grid xs={1}>{index + 1}</Grid>
                            <Grid xs={5}>{getProductName(item.product_ID)}</Grid>
                            <Grid xs={2}>{item.quantity}</Grid>
                            <Grid xs={2}>{formatCurrency(item.price)}đ</Grid>
                            {receipt.status === 4 && (
                                <Grid xs={2}>
                                    <select
                                        value={ratings[item.product_ID] || ''}
                                        onChange={(e) => handleRatingChange(item.product_ID, e.target.value)}
                                        style={{ padding: '4px', margin: 2, }}
                                    >
                                        <option value="">--</option>
                                        <option value="5">★★★★★</option>
                                        <option value="4">★★★★☆</option>
                                        <option value="3">★★★☆☆</option>
                                        <option value="2">★★☆☆☆</option>
                                        <option value="1">★☆☆☆☆</option>
                                    </select>
                                </Grid>

                            )}
                        </Grid>
                    ))}
                </Box>
                {/* Hiển thị đánh giá nếu status === 4 */}
                {receipt.status === 4 && (
                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>Đánh giá đơn hàng</Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">Ý kiến của bạn:</Typography>
                            <textarea onChange={(e) => setComment(e.target.value)} rows={4} style={{ width: '100%', padding: '6px', marginTop: '4px' }} placeholder="Viết cảm nhận..."></textarea>
                        </Box>
                        <Button onClick={handleSubmitRating} style={{ padding: '8px 16px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px' }}>
                            Gửi đánh giá
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );
}

export default ReceiptDetail;
