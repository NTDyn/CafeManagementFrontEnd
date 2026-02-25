import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/admin/Footer/Copyright';
import TableSuppliers from './TableSuppliers';
import AddSupplierModal from './AddSupplierModal';
import { getInitialData } from '../../../redux/actions/supplier';
import { useDispatch, useSelector } from 'react-redux';


export default function MainGrid() {

    const dataSupplier = useSelector(state => state.dataSupplier.data);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!dataSupplier || dataSupplier.length === 0) {
            dispatch(getInitialData())
        }
    }, [dispatch, dataSupplier])
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
            >
                <AddSupplierModal />

            </Grid>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ md: 12, lg: 12 }}>
                    <TableSuppliers
                        dataSupplier={dataSupplier}
                    />
                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}