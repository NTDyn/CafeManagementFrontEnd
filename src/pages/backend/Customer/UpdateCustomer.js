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
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../../redux/actions/customer";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import withReactContent from 'sweetalert2-react-content'
import { Box } from "@mui/material";

export default function UpdateCustomer({ customer, buttonLabel, dataCustomerLevel, dataCustomer }) {
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(customer.isActive)
    const [customerName, setCustomerName] = useState(customer.customer_Name);
    const [customerPhone, setCustomerPhone] = useState(customer.customer_Phone);
    const [customerEmail, setCustomerEmail] = useState(customer.customer_Email);
    const [customerAddress, setCustomerAddress] = useState(customer.customer_Address);
    const [levelID, setLevelID] = useState(customer.level_ID);
    const [levelName, setLevelName] = useState("")
    const [open, setOpen] = useState(false);
    const customerLevelList = dataCustomerLevel.dataCustomerLevel;

    useEffect(() => {

        if (customer && customerLevelList) {

            const lev = customerLevelList.find(data => data.level_ID === customer.level_ID);
            if (lev) {
                setLevelName(lev.level_Name);
            }
        }
    }, [customer]);


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
        if (customerPhone !== customer.customer_Phone && existingCustomer()) {
            notificationSwal("Customer phone is existing!");
            return;
        }
        if (customerPhone.length > 10) {
            notificationSwal("Customer phone is not valid!");
            return;
        }

        confirmSwal()

    }


    const updateCustomer = () => {
        let data = {
            "customer_ID": customer.customer_Id,
            "customer_Name": "" + customerName,
            "customer_Phone": customerPhone,
            "customer_Email": customerEmail,
            "level_ID": levelID,
        }
        dispatch(updateData(data));
    }

    const UpdateIsActive = () => {
        let data = {
            "customer_ID": customer.customer_Id,
            "isActive": !isActive
        }
        console.log(data)
        dispatch(updateData(data));
    }

    function confirmSwal() {
        withReactContent(Swal).fire({
            title: "Do you want to update customer information?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                handleClose()
                updateCustomer()
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })
    }

    function swalIsActive() {
        if (isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this customer?",
                showDenyButton: true,
                confirmButtonText: "UnLock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateIsActive()
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }
        if (isActive === true) {
            withReactContent(Swal).fire({
                title: "Do you want to lock this customer?",
                showDenyButton: true,
                confirmButtonText: "Lock",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateIsActive()
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const notificationSwal = (noti) => {
        withReactContent(Swal).fire({
            title: noti,
        })
    }

    const handleClose = () => {

        setOpen(false);
    };

    return (
        <React.Fragment>

            <Grid container spacing={2} justifyContent="center">
                <Grid xs={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            sx={{ width: '80px', bgcolor: '#23a736' }}
                            onClick={swalIsActive}
                        >
                            {buttonLabel}
                        </Button>
                    </Box>
                </Grid>

                <Grid xs={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            sx={{ width: '80px', bgcolor: '#61a7ed' }}
                            onClick={() => setOpen(true)}
                        >
                            Edit
                        </Button>
                    </Box>
                </Grid>


            </Grid>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: '50%' }}>
                    <DialogTitle sx={{ justifyContent: 'center' }}>Update information of customer</DialogTitle>

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
                                <FormLabel>Address :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    required
                                    name="addressCustomer"
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
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
                                    options={customerLevelList}
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
                                    Update
                                </Button>
                            </Box>

                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
