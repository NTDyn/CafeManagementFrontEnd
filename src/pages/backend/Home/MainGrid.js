import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../../../components/Footer/Copyright';
export default function MainGrid() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            {/* cards */}
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Overview
            </Typography>

            <Grid>
                <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                    <span>Details</span>


                </Typography>

            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid size={{ md: 12, lg: 12 }}>

                </Grid>
            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}