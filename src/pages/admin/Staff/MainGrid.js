import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Copyright from '../../../components/admin/Footer/Copyright';
import TableStaff from './TableStaff';
import AddStaff from './AddStaff';
import { getInitialData as getPermissions } from '../../../redux/actions/permission'
import { getInitialData as getStaffGroup } from "../../../redux/actions/staffGroup";
import { getInitialData as getStaffs } from "../../../redux/actions/staff";
import StaffGroup from './StaffGroup/index.js'

export default function MainGrid() {
    const [openModalHistory, setOpenModalHistory] = useState(false);
    const dataStaffGroup = useSelector(state => state.dataStaffGroup.data)
    const staffData = useSelector(state => state.dataStaff.data)
    const dataPermission = useSelector(state => state.dataPermission.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStaffGroup());
        dispatch(getStaffs());
        dispatch(getPermissions());
    }, [dispatch])

    // const showHistory = async (_id) => {
    //     try {
    //         const dataDiscount = await dispatch(getHistory(_id));  // Make sure to await the dispatch
    //         console.log(dataDiscount);
    //         setDataModalHistory(dataDiscount);  // Use the returned data to update state
    //         setOpenModalHistory(true);  // Open the modal after setting the data
    //     } catch (error) {
    //         console.error('Failed to fetch history data:', error);
    //     }
    // }
    return (

        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ justifyContent: "flex-end", margin: "40px 40px 40px auto" }}
            >
                <Grid size={6}>
                    <StaffGroup
                        dataPermission={dataPermission}
                        dataStaffGroup={dataStaffGroup}
                    />
                </Grid>
                <Grid size={6} sx={{ justifyContent: 'end', display: "flex" }}>
                    <AddStaff
                        staffData={staffData}
                        dataStaffGroup={dataStaffGroup}
                    />
                </Grid>


            </Grid>
            <Grid container spacing={2} columns={12}>

                <Grid size={{ md: 12, lg: 12 }}>
                    <TableStaff
                        dataPermission={dataPermission}
                        staffData={staffData}
                        dataStaffGroup={dataStaffGroup}
                    />
                </Grid>

            </Grid>

            <Copyright sx={{ my: 4 }} />
        </Box>
    );
}