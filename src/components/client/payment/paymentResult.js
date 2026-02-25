import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addData as addReceipt } from '../../../redux/actions/receipt'
export default function PaymentResult() {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');
        const vnp_TxnRef = queryParams.get('vnp_TxnRef');
        const totalAmount = parseInt(queryParams.get('vnp_Amount'), 10);

        if (vnp_ResponseCode && vnp_TxnRef) {
            if (vnp_ResponseCode === '00') {
                // Thanh toán thành công, thêm hóa đơn vào hệ thống
                const receiptData = JSON.parse(localStorage.getItem('receiptData'));

                // Gọi API để thêm hóa đơn vào hệ thống
                dispatch(addReceipt(receiptData));
                Swal.fire('Payment Successful!', '', 'success');
                //  localStorage.removeItem('receiptData');

                localStorage.setItem('cart', JSON.stringify([]));
                // Chuyển hướng về trang lịch sử đơn hàng (hoặc trang khác tùy ý)
                navigate('/client/cart');

            } else {
                Swal.fire('Payment Failed!', '', 'error');
            }
        }
    }, [location, navigate, dispatch]);
}