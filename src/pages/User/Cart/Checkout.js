import React, { useEffect, useState } from 'react';
import { checkoutReceipt, getCustomerLoginByUserName } from '../../../redux/actions/supplier';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2'
import { ChangeStatusReceipt } from '../../../redux/actions/supplier';
import { useNavigate } from 'react-router-dom';
// CSS-in-JS styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formSection: {
    flex: 1,
    marginRight: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  cartSection: {
    width: '350px',
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
  },
  cartHeader: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  cartItems: {
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    marginBottom: '10px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  cartSummary: {
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
  },
  cartRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  cartTotal: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  applyButton: {
    width: '100%',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};


const CheckoutForm = () => {
    const navigate=useNavigate();
    const [getCustomerLogin,setCustomerLogin]=useState({});
    const getUserAccount=sessionStorage?.getItem("Account_UserName");
    const [checkout, setCheckout] = useState([]);
    const [totalPrice,setTotalPrice]=useState();
    const [totalQuantity,setTotalQuantity]=useState();
    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('checkout_product')) || [];
        setCheckout(storedCart);
        let total_q=0;
        let total_p=0;
        storedCart.forEach(item => {
            total_p+=item.quantity_product*item.price;
            total_q+=item.quantity_product;
        });
        setTotalPrice(total_p);
        setTotalQuantity(total_q);
      }, []);

    useEffect(()=>{
        getCustomerLoginByUserName(getUserAccount).then((res)=>{
                setCustomerLogin(res.data.data);
        })
    },[]);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    province: '',
    district: '',
    ward: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const confirmCreateReceipt= (e) => {
    if(getCustomerLogin!=null){
      withReactContent(Swal).fire({
        title: "Do you want to approve this request?",
        showDenyButton: true,
        confirmButtonText: "CheckoutCheckout",
        denyButtonText: `Cancel`
      }).then((result) => {
        if (result.isConfirmed) {
  
          handleSubmit();
          sessionStorage.removeItem("checkout_product")
  
          Swal.fire("Successfully", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
  
      })
    }else{
      Swal.fire("Please Login to buy some items", "", "warning");
    }
  
    
   
     
    }

  const handleSubmit = async(e) => {
  
  if(checkout.length==1){
    const data={
      staff_ID:0,
      customer_ID:getCustomerLogin?.customer_Id,
      totalPrice:totalPrice,
      status:1,
      isActive:true,
      details:checkout.map((item,index)=>{
          return{
              product_ID:item.id_product,
              quantity:item.quantity_product,
              price:item.price,
              isActive:true,
              status:1
          };
      })
  
  
        
     };
     const create =await checkoutReceipt(data);
  }else{
    const data={
      receipt:{
        receipt_ID:checkout[0].id_receipt,
        status:11
      },
      listReceipt:checkout.map((item,index)=>{
        return {
          detail_ID:item.id_detail,
          status:1,
          receipt_ID:item.d_receipt
        }
      })
    }
    const create =await ChangeStatusReceipt(data);
   
  }
 
  



  };

  const handleDicrect=()=>{
    navigate("/user/");
  }


  return (
    <div style={styles.container}>
      {/* Form Section */}
      <div style={styles.formSection}>
        <h1 style={styles.header}>Template Coffee</h1>
        <form >
          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="Name"
              value={getCustomerLogin?.customer_Name}
              onChange={handleChange}
              placeholder="Name"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={getCustomerLogin?.customer_Email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Số điện thoại </label>
            <input
              type="text"
              name="phone"
              value={getCustomerLogin?.customer_Phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={getCustomerLogin?.customer_Address}
              onChange={handleChange}
              placeholder="Địa chỉ"
              style={styles.input}
            />
          </div>
        
        
          <button onClick={()=>confirmCreateReceipt()} type="button" style={styles.submitButton}>
            Đặt hàng
          </button>
          <button onClick={()=>handleDicrect()} type="button" style={styles.submitButton}>
            Quay về
          </button>
        </form>
      </div>

      {/* Cart Section */}
      <div style={styles.cartSection}>
        <h2 style={styles.cartHeader}>Đơn hàng ({totalQuantity} sản phẩm)</h2>
        <div style={styles.cartItems}>
       {checkout.map((item,index)=>(
        <div style={styles.cartItem}>
            <span>{item?.name_product}</span>
            <span>{item?.quantity_product}</span>
            <span>{item?.price}</span>
          </div>
       ))}
          
         
        </div>
        <div style={styles.cartSummary}>
          <div style={styles.cartRow}>
            <span>Tạm tính</span>
            <span>{totalPrice}</span>
          </div>
          <div style={styles.cartRow}>
            <span>Phí vận chuyển</span>
            <span>-</span>
          </div>
          <div style={styles.cartTotal}>
            <span>Tổng cộng: </span>
            <span>{totalPrice}</span>
          </div>
        </div>
        {/* <button style={styles.applyButton}>Nhập mã giảm giá</button> */}
      </div>
    </div>
  );
};

export default CheckoutForm;
