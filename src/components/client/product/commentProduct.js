import { Box, Button, Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData } from '../../../redux/actions/customer';
const CommentProduct = ({ reviews }) => {


    // State cho sao được chọn
    const [selectedRating, setSelectedRating] = useState(0); // 0 nghĩa là xem tất cả bình luận
    const [dataComment, setDataComment] = useState(reviews ? reviews.review : []);
    const [commentList, setCommentList] = useState([]);
    const dataCustomer = useSelector(state => state.dataCustomer.data);

    // Hàm lọc bình luận theo sao
    const dispatch = useDispatch();

    const getComment = () => {
        if (selectedRating === 0) {
            setCommentList(dataComment);
        } else {
            const comments = dataComment?.filter(cmt => cmt.rating === selectedRating);
            setCommentList(comments);
        }
    };

    useEffect(() => {
        if (dataComment.length > 0) {

            getComment();
        }
    }, [dataComment, selectedRating]);

    useEffect(() => {
        dispatch(getInitialData());

    }, [dispatch])

    const getCustomer = (id) => {
        return dataCustomer?.find(cus => cus.customer_Id === id);
    }

    return (
        <Box
            sx={{
                border: '1px solid white',
                borderRadius: '20px',
                padding: 3,
                boxShadow: '0px 0px 10px 12px #f7f4f4',
                marginTop: 5,
                marginBottom: 3,
                height: '600px',
                overflowY: 'auto',
            }}
        >
            <Typography sx={{ fontSize: '20px' }}> PRODUCT REVIEWS </Typography>

            {/* Phần chọn sao để lọc bình luận */}
            <Box className="rating-filter"
                sx={{
                    border: '1px solid',
                    borderRadius: '20px',
                    padding: 3,
                    borderColor: 'antiquewhite',

                }}>
                {[5, 4, 3, 2, 1].map(star => (
                    <Button
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        style={{
                            backgroundColor: selectedRating === star ? 'rgb(255 214 215)' : '#f1f1f1',
                            color: selectedRating === star ? 'white' : '#000',
                            borderRadius: '12px',
                            margin: '0 10px',
                            padding: '8px 12px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        {'⭐'.repeat(star)}
                    </Button>
                ))}
                <button
                    onClick={() => setSelectedRating(0)}
                    style={{
                        backgroundColor: selectedRating === 0 ? 'rgb(255 214 215)' : '#f1f1f1',
                        color: selectedRating === 0 ? 'white' : '#000',
                        borderRadius: '12px',
                        padding: '8px 12px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    All
                </button>
            </Box>

            {/* Hiển thị các bình luận */}
            <div className="reviews-list" style={{ margin: '20px', }}>
                {commentList?.length === 0 ? (
                    <p>There is no review for this product.</p>
                ) : (
                    commentList?.map((review, index) => (
                        <div key={index} className="review-item" style={{ marginBottom: '15px' }}>
                            <div className="review-header" style={{ display: 'flex', alignItems: 'center' }}>
                                <Grid2 container>
                                    <Grid2 size='3'>
                                        <AccountCircleIcon sx={{ fontSize: '40px' }}></AccountCircleIcon>
                                    </Grid2>

                                    <Grid2 size='8' sx={{ padding: '5px' }}>
                                        <Typography>{getCustomer(review?.user_ID)?.customer_Name || 'Customer'}</Typography>
                                        <span style={{
                                            marginLeft: '10px',
                                            fontSize: '10px',
                                        }}>{'⭐'.repeat(review.rating)}</span>
                                        <p>{review.comment}</p>
                                    </Grid2>

                                </Grid2>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </Box >
    );
};

export default CommentProduct;
