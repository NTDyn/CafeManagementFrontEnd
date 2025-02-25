import { getInitialData, updateData } from "../../../redux/actions/warehouse";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { putAPI } from "../../../api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PropTypes from "prop-types";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/material/Grid2';
import { Box, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

function UpdateWarehouse({ wareHouseID, wareHouseName, buttonLabel, isActive }) {
    const dispatch = useDispatch();
    const dataWarehouse = useSelector(state => state.dataWarehouse.data);
    const warehouse = useSelector(state =>
        state.dataWarehouse.data.find(item => item.wareHouse_ID === wareHouseID)
    );

    const [formData, setFormData] = useState({ ...warehouse });
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (!warehouse) {
            dispatch(getInitialData())
        }
        
    }, [dispatch, warehouse]);

    useEffect(() => {
        if (warehouse && formData.wareHouse_ID !== warehouse.wareHouse_ID) {
            setFormData({ ...warehouse });
        }
    }, [warehouse]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const UpdateFunction = () => {
        const data = { wareHouse_ID: wareHouseID, ...formData }
        console.log(data)
        dispatch(updateData(data));
    };

   const confirmSwal = () => {
        const actionText = warehouse.isActive ? "lock" : "unlock";

        withReactContent(Swal).fire({
            title: `Do you want to ${actionText} this warehouse?`,
            showDenyButton: true,
            confirmButtonText: actionText.charAt(0).toUpperCase() + actionText.slice(1),
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedStatus = !warehouse.isActive;

                setFormData((prev) => ({
                    ...prev,
                    isActive: updatedStatus
                }));
    
                dispatch(updateData({ wareHouse_ID: wareHouseID, isActive: updatedStatus }));
                 Swal.fire("Successfully", "", "success");
            } else {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };

    const existingWarehouse = dataWarehouse.find(
        data => data.wareHouse_Name === formData.wareHouse_Name && data.wareHouse_ID !== wareHouseID
    );
    
    const confirmChangeNameSwal = (e) => {
        e.preventDefault();

        if (formData.wareHouse_Name === warehouse?.wareHouse_Name) {
            Swal.fire("No changes detected", "", "info");
            return;
        }

        if (existingWarehouse) {
            Swal.fire("Warehouse name already exists", "", "error");
            return;
        }

        withReactContent(Swal).fire({
            title: "Do you want to change the warehouse name?",
            showDenyButton: true,
            confirmButtonText: "Change",
            denyButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateFunction();
                 Swal.fire("Successfully", "", "success");
                handleClose();
            } else {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    const handleOpen = () => {
        setFormData({ ...warehouse });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const theme = createTheme({
        palette: {
            primary: {
                light: blue[300],
                main: blue[500],
                dark: blue[700],
                darker: blue[900],
            },
        },
    });


    return (
        <  >
            <React.Fragment>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Grid container spacing={2} justifyContent="center">
                        <Grid xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    sx={
                                        { width: '80px', 
                                            bgcolor: warehouse?.isActive ? '#23a736' : '#d32f2f', // Xanh nếu active, đỏ nếu inactive
                                            color: '#fff', // Chữ trắng
                                            '&:hover': {
                                                bgcolor: warehouse?.isActive ? '#1e8e3e' : '#c62828' // Hover đậm hơn
                                            }
                                     }
                                    }
                                    onClick={confirmSwal}

                                >
                                     {warehouse?.isActive ? "Lock" : "Unlock"}
                                </Button>
                            </Box>
                        </Grid>
                        <Grid xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    sx={
                                        { width: '80px', bgcolor: '#185ea5' }
                                    }
                                    onClick={() => setOpen(true)}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </React.Fragment>



            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Change name of warehouse </DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={confirmChangeNameSwal}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <TextField
                                    autoFocus
                                    required
                                    name="wareHouse_Name"
                                    value={formData.wareHouse_Name || ""}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>

        </ >
    );
};


export default UpdateWarehouse;
