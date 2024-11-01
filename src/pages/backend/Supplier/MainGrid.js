import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/Footer/Copyright';
import TableSuppliers from './TableSuppliers';
import AddSupplierModal from './AddSupplierModal';



export default function MainGrid() {
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
                <Grid size={{ md: 12, lg: 9 }}>
                    <TableSuppliers />
                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}