// Import các thư viện cần thiết
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/actions/supplier';
import { AddCart } from '../../../redux/actions/supplier';
import { getCustomerLoginByUserName } from '../../../redux/actions/supplier';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Header from '../HomeUser/Header';
const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const[getProduct,setProduct]=useState({});
    const [getLoginAccount,setLoginAccount]=useState({});
    const navigate=useNavigate();
    const { id } = useParams();
    const [alert,setAlert]=useState(false);
    const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === 'increment' ? prev + 1 : Math.max(1, prev - 1)));
    };
    
    useEffect(()=>{
        getProductById(id).then((res)=>{
            setProduct(res.data.data);
        })
    },[])

    const handleAddCart=async(id)=>{
        const userName=sessionStorage.getItem("Account_UserName");
        const cus=getCustomerLoginByUserName(userName);
        const data_cart={
            receiptDetail:{
                product_ID:id,
                quantity:quantity,
                price:getProduct.price,
                isActive:true,
                status:0,

            },
            id_customer:(await cus).data.data.customer_Id
        }
        const res=await AddCart(data_cart);
        if(res.data.status===200){
            setTimeout(() => {
                setAlert({ message: "Success" });
                setTimeout(() => {
                    setAlert(false);
                  }, 2000);
              }, 1000);
           
        }
      
      
       
       
    }
    const handleCheckout=(id)=>{
       const data=[
        {
            id_product:id,
            quantity_product:quantity,
            price:getProduct.price,
            name_product:getProduct.product_Name
        }
       ]
       sessionStorage.setItem("checkout_product",JSON.stringify(data));
       console.log(sessionStorage.getItem("checkout_product"));
       navigate("/user/checkout");
    }

    return (
      
        <div style={styles.productDetail}>
         {alert && <Alert severity="success">Thêm giỏ hàng thành công</Alert>}
            <button style={styles.backButton}>Quay về xem trang chủ</button>
            <div style={styles.productInfo}>
                <img src={`${process.env.REACT_APP_BASE_URL}/${getProduct.product_Image}?t=${Date.now()}`} alt="Cafe Cappuccino" style={styles.productImage} />
                <div style={styles.productDetails}>
                    <h1 style={styles.title}>{getProduct.product_Name}</h1>
                    <div style={styles.rating}>{'⭐'.repeat(5)}</div>
                    <p style={styles.description}>Mô tả đang cập nhật</p>
                    <div style={styles.price}>Giá: <span>{getProduct.price}</span></div>

                   

                   

                    <div style={styles.quantity}>
                        <button onClick={() => handleQuantityChange('decrement')} style={styles.quantityButton}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleQuantityChange('increment')} style={styles.quantityButton}>+</button>
                    </div>

                    <div style={styles.actions}>
                        <button onClick={()=>handleAddCart(getProduct.product_ID)} style={styles.addToCart}>Thêm vào giỏ hàng</button>
                       
                        <button onClick={()=>handleCheckout(getProduct.product_ID)} style={styles.orderNow}>Đặt hàng ngay</button>
                    </div>

                   
                </div>
            </div>
        </div>
    );
};

const styles = {
    productDetail: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#fdf4f0',
    },
    backButton: {
        marginBottom: '20px',
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    productInfo: {
        display: 'flex',
        gap: '20px',
    },
    productImage: {
        width: '200px',
        height: '200px',
        borderRadius: '10px',
    },
    productDetails: {
        flex: 1,
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    rating: {
        color: '#fbc02d',
        margin: '10px 0',
    },
    description: {
        marginBottom: '10px',
        color: '#555',
    },
    price: {
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    size: {
        marginBottom: '20px',
    },
    note: {
        width: '100%',
        height: '50px',
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    quantity: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    quantityButton: {
        padding: '5px 10px',
        margin: '0 10px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    actions: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    addToCart: {
        padding: '10px 20px',
        backgroundColor: '#ff9800',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    orderNow: {
        padding: '10px 20px',
        backgroundColor: '#795548',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    promotion: {
        fontSize: '14px',
        color: '#333',
    },
};

export default ProductDetail;
