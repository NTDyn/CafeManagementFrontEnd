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
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, addData } from "../../../../redux/actions/ingredientCategory";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content'
import TableCustomerLevel from "./TableCustomerLevel";
import { Box } from "@mui/material";
import AddLevel from './AddLevel'
export default function CustomerLevel() {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>

            <Button
                variant="outlined"
                color="neutral"
                startIcon={<SettingsIcon />}
                onClick={() => setOpen(true)}
            >
                Customer Level
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: "80%", overflowY: 'scroll' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <AddLevel />
                    </Box>
                    <TableCustomerLevel />

                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
