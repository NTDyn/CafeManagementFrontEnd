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
    const [open, setOpen] = useState(false);
    const [nameChange, setNameChange] = useState(wareHouseName);
    const dataWarehouse = useSelector(state => state.dataWarehouse.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const UpdateFunction = () => {

        let data = {

            "wareHouse_ID": wareHouseID,
            "wareHouse_Name": nameChange,
            "isActive": isActive
        }
        dispatch(updateData(data))
    };

    const confirmSwal = () => {
        if (isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to lock this warehouse?",
                showDenyButton: true,
                confirmButtonText: "Lock",
                denyButtonText: `Don't lock`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateFunction()
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }
        if (isActive === true) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this warehouse?",
                showDenyButton: true,
                confirmButtonText: "Unlock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateFunction()
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const existingWarehouse = dataWarehouse.find(
        dataWarehouse => dataWarehouse.wareHouse_Name === nameChange
    );
    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (existingWarehouse) {
            Swal.fire("Warehouse name is existing");
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to change name of warehouse?",
                showDenyButton: true,
                confirmButtonText: "Change",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateFunction();
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }
        handleClose()
    }

    const handleClose = () => {
        setNameChange(null);
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
                                        { width: '80px', bgcolor: '#23a736' }
                                    }
                                    onClick={confirmSwal}

                                >
                                    {buttonLabel}
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
                                    name="nameWarehouse"
                                    value={wareHouseName}
                                    onChange={(e) => setNameChange(e.target.value)}
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

// DeleteCategory.propTypes = {
//     categoryID: PropTypes.number.isRequired,
// }


export default UpdateWarehouse;
