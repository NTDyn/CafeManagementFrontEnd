import React, { useEffect, useState } from "react";
import { getCustomerLoginByUserName, getListCart, getProductById } from "../../../redux/actions/supplier";
const CartPage = () => {
  const[listCart,setListCart]=useState([])
  const [cart, setCart] = useState([]);
  const[listProduct,setListProduct]=useState([]);
  const [getCustomerLogin,setCustomerLogin]=useState({});
  const getUserAccount=sessionStorage?.getItem("Account_UserName");
  useEffect(() => {
    getCustomerLoginByUserName(getUserAccount).then((res) => {
      setCustomerLogin(res.data.data);
    });
  }, []);
  
  useEffect(() => {
    if (getCustomerLogin.customer_Id) {
      getListCart(getCustomerLogin.customer_Id).then((res) => {
        setCart(res.data.data[0].details);
        console.log(res.data.data[0].details);
      });
    }
  }, [getCustomerLogin]);
  
  useEffect(() => {
    if (cart.length > 0) {
      cart.forEach((item) => {
        getProductById(item.product_ID).then((res) => {
          setListProduct((pre) => [...pre, res.data.data]);
        });
      });
    }
  }, [cart]);



  const incrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "2px solid #ccc",
      paddingBottom: "10px",
      fontWeight: "bold",
    },
    itemContainer: {
      marginTop: "20px",
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      padding: "10px 0",
    },
    itemDetails: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    image: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "5px",
    },
    itemInfo: {
      margin: 0,
    },
    itemActions: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    button: {
      width: "30px",
      height: "30px",
      backgroundColor: "#ddd",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "18px",
    },
    quantity: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    deleteButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "20px",
      color: "#f00",
    },
    summary: {
      marginTop: "20px",
      borderTop: "2px solid #ccc",
      paddingTop: "20px",
      textAlign: "right",
    },
    checkoutButton: {
      padding: "10px 20px",
      backgroundColor: "red",
      color: "white",
      border: "none",
      fontSize: "16px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>Sản Phẩm</span>
        <span>Số Lượng</span>
      </div>
      <div style={styles.itemContainer}>
        {cart.map((item,index) => (
          
          <div key={item.detail_ID} style={styles.item}>
            <div style={styles.itemDetails}>
              <img src= {`${process.env.REACT_APP_BASE_URL}/${listProduct[index]?.product_Image}?t=${Date.now()}`}  alt={item.name} style={styles.image} />
              <div>
                <h3 style={styles.itemInfo}>{listProduct[index]?.product_Name}</h3>
                
                <p style={styles.itemInfo}>
                  {item.price.toLocaleString()}đ
                </p>
              </div>
            </div>
          
            <div style={styles.itemActions}>
              <button
                style={styles.button}
                onClick={() => decrementQuantity(item.id)}
              >
                -
              </button>
              <span style={styles.quantity}>{item.quantity}</span>
              <button
                style={styles.button}
                onClick={() => incrementQuantity(item.id)}
              >
                +
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => removeItem(item.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.summary}>
        <h3>Đơn Hàng</h3>
        <p>{cart.length} Sản Phẩm</p>
        <p>{calculateTotal().toLocaleString()}đ</p>
        <button style={styles.checkoutButton}>THANH TOÁN</button>
      </div>
    </div>
   
  );
};

export default CartPage;
