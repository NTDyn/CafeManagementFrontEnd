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

export default function DetailCustomer({ customer, dataCustomerLevel }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState()
    const customerLevelList = dataCustomerLevel.dataCustomerLevel;
    useEffect(() => {
        if (customer && customerLevelList) {
            const lev = customerLevelList.find(data => data.level_ID === customer.level_ID);
            if (lev) {
                setLevel(lev.level_Name);
            }
        }
    }, [customer, customerLevelList]);

    const handleClose = () => {
        setOpen(false);
    };

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
                    <DialogTitle sx={{ justifyContent: 'center' }}>Information of customer</DialogTitle>
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
                                    name="nameCustomer"
                                    value={customer.customer_Name}
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
                                    value={customer.customer_Phone}

                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Address :</FormLabel>
                                <Input
                                    sx={{ width: '50%' }}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    value={customer.customer_Address}

                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Email :</FormLabel>
                                <TextField
                                    sx={{ width: '50%' }}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    value={customer.customer_Email}

                                />
                            </FormControl>
                            <FormControl sx={{ flexWrap: 'wrap', alignContent: 'center' }}>
                                <FormLabel>Level customer :</FormLabel>
                                <TextField
                                    sx={{ width: '50%' }}
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    value={level}

                                />
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
