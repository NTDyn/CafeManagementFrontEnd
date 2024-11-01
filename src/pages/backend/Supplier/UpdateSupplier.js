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

function UpdateSupplier({ supplier_ID, supplier_Name, buttonLabel, isActive }) {
    const [open, setOpen] = useState(false);
    const [supplierID, setSupplierID] = useState(supplier_ID);
    const [supplierName, setSupplierName] = useState(supplier_Name);
    const dataSupplier = useSelector(state => state.dataSupplier.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const UpdateInformation = () => {

        let data = {
            "supplier_ID": supplierID,
            "supplier_Name": supplierName,
            "isActive": null
        }
        dispatch(updateData(data))
    };

    const UpdateStatus = () => {

        let data = {
            "supplier_ID": supplierID,
            "supplier_Name": null,
            "isActive": isActive
        }
        dispatch(updateData(data))
    }

    const confirmSwal = () => {
        if (isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to lock this supplier?",
                showDenyButton: true,
                confirmButtonText: "Lock",
                denyButtonText: `Don't lock`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateStatus();
                    Swal.fire("Successfully", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }
        if (isActive === true) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this supplier?",
                showDenyButton: true,
                confirmButtonText: "Unlock",
                denyButtonText: `Don't unlock`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateStatus()
                    Swal.fire("Successfully", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const existingSupplier = () => {
        return dataSupplier.find(
            dataSupplier => dataSupplier.supplier_Name === supplierName)

    };

    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (supplierName === supplier_Name) {
            Swal.fire("Supplier name is not changed!");

        } else if (existingSupplier()) {
            Swal.fire("Supplier name is existing");
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to change name of supplier?",
                showDenyButton: true,
                confirmButtonText: "Change",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateInformation();
                    handleClose();
                    Swal.fire("Successfully", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const handleClose = () => {
        setSupplierName(supplier_Name);
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

                    <Button
                        sx={
                            { bgcolor: '#23a736' }
                        }
                        onClick={confirmSwal}

                    >
                        {buttonLabel}
                    </Button>

                    <Button
                        sx={
                            { bgcolor: '#185ea5' }
                        }
                        onClick={() => setOpen(true)}
                    >
                        Edit
                    </Button>
                </Stack>



                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
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

                                <Button
                                    type="submit"

                                >
                                    Submit
                                </Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </React.Fragment >
        </ >
    );
};

// DeleteCategory.propTypes = {
//     categoryID: PropTypes.number.isRequired,
// }


export default UpdateSupplier;
