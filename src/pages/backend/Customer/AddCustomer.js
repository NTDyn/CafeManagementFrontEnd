import React, { useState, useEffect } from "react"
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, addData } from "../../../redux/actions/customer";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import withReactContent from 'sweetalert2-react-content'
import { Box } from "@mui/material";

export default function AddCustomer({ dataCustomerLevel }) {
    const dispatch = useDispatch()
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [levelID, setLevelID] = useState("");
    const [levelName, setLevelName] = useState("")
    const [open, setOpen] = useState(false);

    const dataCustomer = useSelector(state => state.dataCustomer.data)


    const existingCustomer = () => {

        return dataCustomer.find(
            data => data.customer_Phone === customerPhone
        )
    };



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!/\S+@\S+\.\S+/.test(customerEmail)) {
            notificationSwal("Email address is not valid!");
            return;
        }
        if (existingCustomer()) {
            notificationSwal("Customer phone is existing!");
            return;
        }
        if (customerPhone.length > 10) {
            notificationSwal("Customer phone is not valid!");
            return;
        }

        confirmSwal()

    }


    const addCustomer = () => {
        let data = {
            "customer_Name": "" + customerName,
            "customer_Phone": customerPhone,
            "customer_Email": customerEmail,
            "level_ID": levelID,
            "isActive": true
        }
        dispatch(addData(data));
    }


    const confirmSwal = () => {
        withReactContent(Swal).fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                handleClose()
                addCustomer()
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })
    }

    const notificationSwal = (noti) => {
        withReactContent(Swal).fire({
            title: noti,
        })
    }

    const handleClose = () => {
        setCustomerName("");
        setCustomerPhone("");
        setCustomerEmail("");
        setLevelID("");
        setLevelName("")
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Customer
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: '50%' }}>
                    <DialogTitle sx={{ justifyContent: 'center' }}>Create new customer</DialogTitle>
                    <DialogContent sx={{ textAlign: 'center' }}>Fill in the information.</DialogContent>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2} >
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel> Name :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    autoFocus
                                    required
                                    name="nameCustomer"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Phone Number :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    required
                                    name="phoneCustomer"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Email :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    required
                                    name="emailCustomer"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Level customer :</FormLabel>
                                <Autocomplete
                                    sx={{
                                        marginTop: '1%',
                                        height: 50,
                                        width: '50%',
                                    }}
                                    disablePortal
                                    options={dataCustomerLevel}
                                    getOptionLabel={(option) => option.level_Name ? option.level_Name : ""}
                                    name="customerLevel"
                                    value={levelName ? { level_Name: levelName } : null}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setLevelID(newValue.level_ID); // Lấy category_ID từ mục được chọn
                                            setLevelName(newValue.level_Name); // Cập nhật categoryName để hiển thị
                                        } else {
                                            setLevelID(null); // Xử lý khi không có mục nào được chọn
                                            setLevelName('')
                                        }
                                    }}

                                    renderInput={(params) => <TextField
                                        required
                                        {...params}

                                    />}
                                />
                            </FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type="submit"
                                    sx={{ marginTop: '2%' }}
                                >
                                    Submit
                                </Button>
                            </Box>

                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
