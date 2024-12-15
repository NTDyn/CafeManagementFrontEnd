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
import { getInitialData as getCustomerLevel } from "../../../redux/actions/customerLevel";
import HistoryPoint from "./HistoryPoint";
import { getInitialData as getHistory } from "../../../redux/actions/historyDiscount";
import { getInitialData as getCustomer } from "../../../redux/actions/customer";

export default function MainGrid() {
    const [openModalHistory, setOpenModalHistory] = useState(false);
    const dataCustomerLevel = useSelector(state => state.dataCustomerLevel.data)
    const customers = useSelector(state => state.dataCustomer.data)
    console.log(customers)
    const historyDiscount = useSelector(state => state.dataHistoryDiscount.data)
    const [dataModalHistory, setDataModalHistory] = useState({
        "customer_ID": 0,
        "cuppon_ID": -1,
        "receipt_ID": 0,
        'createdDate': 0,
        'priceDisscount': 0

    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCustomerLevel());
        dispatch(getCustomer())
    }, [dispatch])

    const showHistory = async (_id) => {
        try {
            const dataDiscount = await dispatch(getHistory(_id));  // Make sure to await the dispatch
            console.log(dataDiscount);
            setDataModalHistory(dataDiscount);  // Use the returned data to update state
            setOpenModalHistory(true);  // Open the modal after setting the data
        } catch (error) {
            console.error('Failed to fetch history data:', error);
        }
    }
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
                        customers={customers}
                        dataCustomerLevel={dataCustomerLevel}
                        showHistory={showHistory}
                    />
                </Grid>

            </Grid>
            <HistoryPoint
                data={historyDiscount}
                openModalHistory={openModalHistory}
                customers={customers}
                setOpenModalHistory={setOpenModalHistory}
            />
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}