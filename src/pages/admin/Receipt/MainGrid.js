import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/admin/Footer/Copyright';
import TableReceipt from './TableReceipt';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData as getReceipts } from '../../../redux/actions/receipt';
import { getInitialData as getProducts } from '../../../redux/actions/products';
import { getInitialData as getCustomers } from '../../../redux/actions/customer';
import AddReceipt from './AddReceipt';
import { Typography } from '@mui/material';
import { getMenu } from '../../../redux/actions/menu';


export default function MainGrid() {
    const dispatch = useDispatch();
    const receiptData = useSelector(state => state.dataReceipt.data);
    const productData = useSelector(state => state.dataProduct.data);
    const [listReceipt, setListReceipt] = React.useState([]);
    const customerList = useSelector(state => state.dataCustomer.data);
    const allMenus = useSelector(state => state.dataMenu.data);
    const menuData = allMenus?.find(menu => menu.isSelected === true);
    console.log(productData)

    // Lấy dữ liệu lần đầu
    React.useEffect(() => {
        dispatch(getReceipts());
        dispatch(getProducts());
        dispatch(getCustomers());
        dispatch(getMenu());
    }, [dispatch]);

    // Cập nhật khi receiptData thay đổi
    React.useEffect(() => {
        setListReceipt(receiptData);
    }, [receiptData]);

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                <span>
                    <AddReceipt
                        productData={productData}
                        menuData={menuData}
                        customerList={customerList}
                    />
                </span>
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ md: 12, lg: 12 }}>
                    <TableReceipt
                        customerList={customerList}
                        listReceipt={listReceipt}
                        productData={productData} />
                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}