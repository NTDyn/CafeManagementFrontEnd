import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Copyright from '../../../components/Footer/Copyright';
import TableCustomer from './TableCustomer';
import AddCustomer from './AddCustomer'
import CustomerLevel from './CustomerLevel/CustomerLevel'
import { getInitialData } from "../../../redux/actions/customerLevel";


export default function MainGrid() {

    const dataCustomerLevel = useSelector(state => state.dataCustomerLevel.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])
    return (

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
            >
                <Grid size={6}>
                    <CustomerLevel />
                </Grid>
                <Grid size={6} sx={{ justifyContent: 'end', display: "flex" }}>
                    <AddCustomer
                        dataCustomerLevel={dataCustomerLevel}
                    />
                </Grid>


            </Grid>
            <Grid container spacing={2} columns={12}>

                <Grid size={{ md: 12, lg: 12 }}>
                    <TableCustomer
                        dataCustomerLevel={dataCustomerLevel}
                    />
                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}