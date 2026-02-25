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

export default function DetailStaff({ staff, dataStaffGroup, dataPermission }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [group, setGroup] = useState()

    useEffect(() => {
        if (staff && dataStaffGroup) {
            const grp = dataStaffGroup.find(data => data.staffGroup_ID === staff.staffGroup_ID);
            if (grp) {
                setGroup(grp);
            }
        }
    }, [staff, dataStaffGroup]);

    const handleClose = () => {
        setOpen(false);
    };

    const getPermission = (id) => {
        return dataPermission.find(per => per.permission_ID === id)
    }
    return (
        <React.Fragment>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ width: '80px', bgcolor: '#000000' }}
                    onClick={() => setOpen(true)}
                >
                    Detail
                </Button>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: '50%' }}>
                    <DialogTitle sx={{ justifyContent: 'center' }}>Information of staff</DialogTitle>
                    <Box>
                        <Stack spacing={2} >
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel> Name :</FormLabel>
                                <TextField
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    sx={{ width: '50%' }}
                                    name="nameStaff"
                                    value={staff.staff_FullName}
                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Phone Number :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    value={staff.staff_Phone}

                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Position :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    value={group?.staffGroup_Name}

                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Permissions :</FormLabel>
                                <Box
                                    sx={{
                                        width: '50%',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        bgcolor: '#f9f9f9',
                                    }}
                                >
                                    <Stack spacing={0.5}>
                                        {group?.permissions?.map((permObj, index) => {
                                            const permission = getPermission(permObj.permission_ID);
                                            return permission ? (
                                                <div key={index}>{permission.permission_Name}</div>
                                            ) : null;
                                        })}
                                    </Stack>
                                </Box>
                            </FormControl>




                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    sx={{ marginTop: '2%' }}
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </Box>

                        </Stack>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
