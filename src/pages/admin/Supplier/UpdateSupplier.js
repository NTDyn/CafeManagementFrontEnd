import { getInitialData, updateData } from "../../../redux/actions/supplier";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import dayjs from "dayjs";
import { use } from "react";
function UpdateSupplier({ dataSupplier, supplier }) {

    const [open, setOpen] = useState(false);
    const [supplierID, setSupplierID] = useState(supplier.supplier_ID);
    const [supplierName, setSupplierName] = useState(supplier.supplier_Name);
    const [supplierAddress, setSupplierAddress] = useState(supplier.supplier_Address);
    const [supplierPhone, setSupplierPhone] = useState(supplier.supplier_Phone);
    const [supplierEmail, setSupplierEmail] = useState(supplier.supplier_Email);
    const dispatch = useDispatch();

    useEffect(() => {
        if (supplierID && dataSupplier.length > 0) {
            const updatedSupplier = dataSupplier.find(
                (item) => item.supplier_ID === supplierID
            );
            if (updatedSupplier) {
                setSupplierName(updatedSupplier.supplier_Name);
                setSupplierAddress(updatedSupplier.supplier_Address);
                setSupplierEmail(updatedSupplier.supplier_Email)
            }
        }
    }, [supplierID, dataSupplier]);


    const UpdateInformation = async (isActive) => {
        let data = {
            "supplier_ID": supplierID,
            "supplier_Name": supplierName,
            "supplier_Address": supplierAddress,
            "supplier_Phone": supplierPhone,
            "supplier_Email": supplierEmail,
            "isActive": isActive,
        }
        dispatch(updateData(data))

    };


    const confirmSwal = async () => {

        withReactContent(Swal).fire({
            title: "Do you want to delete  this supplier?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateInformation(false);
                Swal.fire("Successfully", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })


    }

    const existingSupplier = () => {
        return dataSupplier.find(
            dataSupplier => dataSupplier.supplier_Name === supplierName && dataSupplier.supplier_ID !== supplier.supplier_ID)

    };

    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (supplierName === supplier.supplier_Name && supplierAddress === supplier.setSupplier_Address && supplierPhone === supplier.supplier_Phone && supplierEmail === supplier.setSupplier_Email) {
            Swal.fire("Supplier is not changed!");

        }
        else if (existingSupplier()) {
            Swal.fire("Supplier name is existing");
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to change information of supplier?",
                showDenyButton: true,
                confirmButtonText: "Change",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateInformation(true);
                    handleClose();
                    Swal.fire("Successfully", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const handleClose = () => {
        setSupplierName(supplier.supplier_Name);
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

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
                                        {
                                            width: '80px',
                                            bgcolor: '#23a736', // Xanh nếu active, đỏ nếu inactive
                                            color: '#fff', // Chữ trắng
                                            '&:hover': {
                                                bgcolor: '#1e8e3e'  // Hover đậm hơn
                                            }

                                        }
                                    }
                                    onClick={confirmSwal}

                                >
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                        <Grid xs={3}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    sx={
                                        { width: '80px', bgcolor: '#185ea5' }
                                    }
                                    onClick={() => handleOpen()}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </React.Fragment>




            <Modal
                open={open}
                onClose={() => setOpen(false)
                }
                sx={{
                    zIndex: 1000
                }}
            >
                <ModalDialog>
                    <DialogTitle>Change name of supplier</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={confirmChangeNameSwal}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameSupplier"
                                    value={supplierName}
                                    onChange={(e) => setSupplierName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    required
                                    name="addressSupplier"
                                    value={supplierAddress}
                                    onChange={(e) => setSupplierAddress(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    required
                                    name="emailSupplier"
                                    value={supplierEmail}
                                    onChange={(e) => setSupplierEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    required
                                    name="phoneSupplier"
                                    value={supplierPhone}
                                    onChange={(e) => setSupplierPhone(e.target.value)}
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




export default UpdateSupplier;
