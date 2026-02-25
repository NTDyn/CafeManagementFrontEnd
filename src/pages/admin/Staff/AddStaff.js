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
import { addData } from "../../../redux/actions/staff";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import withReactContent from 'sweetalert2-react-content'
import { Box } from "@mui/material";

export default function AddStaff({ staffData, dataStaffGroup }) {
    const dispatch = useDispatch()
    const [staffName, setStaffName] = useState("");
    const [staffPhone, setStaffPhone] = useState("");
    const [groupID, setGroupID] = useState("");
    const [groupName, setGroupName] = useState("")
    const [staffUsername, setStaffUserName] = useState("")
    const [staffPassword, setStaffPassword] = useState("")
    const [open, setOpen] = useState(false);



    const existingStaff = () => {

        return staffData.find(
            data => data.staff_Phone === staffPhone
        )
    };


    const isValid = () => {
        let isValid = true;

        if (existingStaff()) {
            notificationSwal("Staff phone is existing!");
            isValid = false;
            return;
        }
        if (staffPhone.length > 10) {
            notificationSwal("Staff phone is not valid!");
            isValid = false;
            return;
        }
        return isValid;
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isValid())
            confirmSwal()

    }


    const addStaff = () => {
        let data = {
            "staff_FullName": staffName,
            "staff_Phone": staffPhone,
            "username": staffUsername,
            "password": staffPassword,
            "staffGroup_ID": groupID,
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
                addStaff()
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
        setStaffName("");
        setStaffPhone("");
        setStaffUserName("");
        setStaffPassword("")
        setGroupID("");
        setGroupName("")
        setOpen(false);
    };

    return (
        <React.Fragment>

            <Button
                variant="outlined"
                color="neutral"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Staff
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: '50%' }}>
                    <DialogTitle sx={{ justifyContent: 'center' }}>Create new staff</DialogTitle>
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
                                    name="nameStaff"
                                    value={staffName}
                                    onChange={(e) => setStaffName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Phone Number :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    required
                                    name="phoneStaff"
                                    value={staffPhone}
                                    onChange={(e) => setStaffPhone(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Username :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    required
                                    name="usenameStaff"
                                    value={staffUsername}
                                    onChange={(e) => setStaffUserName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Password :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    required
                                    name="passwordStaff"
                                    value={staffPassword}
                                    onChange={(e) => setStaffPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Position :</FormLabel>
                                <Autocomplete
                                    sx={{
                                        marginTop: '1%',
                                        height: 50,
                                        width: '50%',
                                    }}
                                    disablePortal
                                    options={dataStaffGroup}
                                    getOptionLabel={(option) => option.staffGroup_Name ? option.staffGroup_Name : ""}
                                    name="group"
                                    value={groupName ? { staffGroup_Name: groupName } : null}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setGroupID(newValue.staffGroup_ID);
                                            setGroupName(newValue.staffGroup_Name);
                                        } else {
                                            setGroupID(null); // Xử lý khi không có mục nào được chọn
                                            setGroupName('')
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
