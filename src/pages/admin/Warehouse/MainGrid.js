import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Copyright from '../../../components/admin/Footer/Copyright';
import TableWarehouse from './TableWarehouse';
import AddWarehouse from './AddWarehouse';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getInitialData } from "../../../redux/actions/warehouse";

export default function MainGrid() {
    const data = useSelector(state => state.dataWarehouse.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!data || data.length === 0) {
            dispatch(getInitialData())
        }
    }, [dispatch, data])
    console.log(data)
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
            >
                <AddWarehouse
                    dataWarehouse={data}
                ></AddWarehouse>


            </Grid>
            <Grid container spacing={2} columns={12}>

                <Grid size={{ md: 12, lg: 12 }}>
                    <TableWarehouse
                        data={data} >

                    </TableWarehouse>

                </Grid>

            </Grid>
            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}