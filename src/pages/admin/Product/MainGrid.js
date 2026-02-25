import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../../../components/admin/Footer/Copyright.js';
import CustomizedDataGrid from './TableProduct.js';
import StatCard from './StatCard';
import AddProduct from './AddProduct.js'
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData as dataProduct } from '../../../redux/actions/products/index.js';

export default function MainGrid() {
    const listProducts = useSelector(state => state.dataProduct.data);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(dataProduct());
    }, [dispatch])
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>


            <Grid>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    <span>
                        <AddProduct />
                    </span>
                </Typography>

            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid size={{ md: 12, lg: 12 }}>
                    <CustomizedDataGrid
                        listProducts={listProducts}
                    />
                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}