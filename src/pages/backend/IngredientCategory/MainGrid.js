import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Copyright from '../../../components/Footer/Copyright';
import TableIngredientCategory from './TableIngredientCategory';
import AddIngredientCategory from './AddIngredientCategory'

const handleNext = () => {
    console.log("button add")
};

export default function MainGrid() {
    return (

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
            >
                <AddIngredientCategory />

            </Grid>
            <Grid container spacing={2} columns={12}>

                <Grid size={{ md: 12, lg: 12 }}>
                    <TableIngredientCategory />
                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}