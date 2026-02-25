import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './main.css';
import { getMenu } from '../../../redux/actions/menu';
import { getInitialData as getMenuDetail } from '../../../redux/actions/menuDetail';
import { getInitialData as getCategories } from '../../../redux/actions/productCategory';
import { getProductRate } from '../../../redux/actions/productReview';
import { TextField, InputAdornment, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import LoadingProduct from './errorHandling/loadingProduct';
import DataNotFound from './errorHandling/dataNotFound';
import ProductDetail from './productDetail';

const urlImage = process.env.REACT_APP_BASE_URL;

function Main() {
    const dispatch = useDispatch();
    const listMenu = useSelector(state => state.dataMenu.data);
    const listProducts = useSelector(state => state.dataMenuDetail.data);
    const listCategories = useSelector(state => state.dataProductCategory.data);

    const mainMenu = listMenu?.find(menu => menu.isSelected === true);

    const [productReviews, setProductReviews] = useState({});
    const [keyword, setKeyword] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const categories = [{ category_ID: 0, category_Name: 'All' }, ...listCategories];

    const [openDetail, setOpenDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(getMenu());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (mainMenu?.menu_ID) {
            dispatch(getMenuDetail(mainMenu.menu_ID));
        }
    }, [mainMenu]);

    // Fetch ratings after products are loaded
    useEffect(() => {
        const fetchAllRatings = async () => {
            const reviews = {};
            for (const item of listProducts) {
                const res = await dispatch(getProductRate(item.product.product_ID));

                if (res?.data?.averageRating !== undefined) {
                    reviews[item.product.product_ID] = res.data;
                }
            }
            setProductReviews(reviews);
        };

        if (listProducts.length > 0) {
            fetchAllRatings();
        }
    }, [listProducts]);

    useEffect(() => {
        console.log(listProducts)
        const filtered = listProducts.filter(item => {
            const name = removeVietnameseTones(item.product?.product_Name.toLowerCase());
            const keywordCleaned = removeVietnameseTones(keyword.toLowerCase());

            const matchCategory =
                selectedCategory === 0 || item.product?.product_Category === selectedCategory;
            const matchKeyword = name.includes(keywordCleaned);

            return matchCategory && matchKeyword;

        });

        setFilteredProducts(filtered);
    }, [keyword, selectedCategory, listProducts]);

    const handleOpenDetail = (item) => {
        setSelectedProduct(item);
        setOpenDetail(true);
    };

    const formatCurrency = (number) => number.toLocaleString('vi-VN');

    const removeVietnameseTones = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    };

    const loopCard = () => {
        if (listProducts.length === 0) return <LoadingProduct />;
        if (filteredProducts.length === 0) return <DataNotFound />;

        return (
            <div className="container" style={{ marginTop: '-1rem' }}>
                <div className="row row-cols-1 row-cols-md-4 g-4 mt-5">
                    {filteredProducts.map((item) => {
                        const img = `${urlImage}/${item.product?.product_Image}`;
                        const productID = item.product?.product_ID;
                        const reviewData = productReviews[productID] || {};

                        return (
                            <div
                                key={productID}
                                className="col-lg-3 col-6 text-start my-5 popup"
                                onClick={() => handleOpenDetail(item.product)}
                            >
                                <div className="card card-product">
                                    <img
                                        src={img}
                                        className="card-img-product"
                                        alt="card"
                                        onError={(e) => e.target.src = '/default_image.jpg'}
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title-product">{item.product?.product_Name}</h5>
                                        <p className="s-4-product">{formatCurrency(item.product?.price)} đ</p>
                                        <Rating
                                            name="read-only"
                                            value={reviewData.averageRating || 5}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {openDetail && selectedProduct && (

                    <ProductDetail
                        openDetail={openDetail}
                        handleClose={() => setOpenDetail(false)}
                        item={selectedProduct}
                        reviews={productReviews[selectedProduct?.product_ID]}
                    />
                )}
            </div>
        );
    };

    return (
        <main style={{ marginTop: '6rem' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Search bar */}
                        <div className="search-container" style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                variant="outlined"
                                placeholder="Search your beverages..."
                                size="small"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                sx={{
                                    width: '100%',
                                    maxWidth: 500,
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        {/* Category buttons */}
                        <div className="category-buttons" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            justifyContent: 'center',
                            margin: '1rem 0'
                        }}>
                            {categories.map((cat) => {
                                const name = cat.category_Name;
                                const id = cat.category_ID;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setSelectedCategory(id)}
                                        style={{
                                            padding: '8px 16px',
                                            borderRadius: '20px',
                                            border: selectedCategory === id ? '2px solid #1976d2' : '1px solid #ccc',
                                            backgroundColor: selectedCategory === id ? '#1976d2' : '#f9f9f9',
                                            color: selectedCategory === id ? '#fff' : '#333',
                                            cursor: 'pointer',
                                            fontWeight: selectedCategory === id ? 'bold' : 'normal'
                                        }}
                                    >
                                        {name}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Product cards */}
                        {loopCard()}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;
