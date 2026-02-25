import React, { useState, useEffect } from "react"
import { Button } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content'
import TableStaffGroup from "./TableStaffGroup";
import { Box } from "@mui/material";
import AddStaffGroup from './AddStaffGroup';


export default function StaffGroup({ dataStaffGroup, dataPermission }) {
    const [open, setOpen] = useState(false);


    return (
        <React.Fragment>

            <Button
                variant="outlined"
                color="neutral"
                startIcon={<SettingsIcon />}
                onClick={() => setOpen(true)}
            >
                Staff Position
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: "80%", overflowY: 'scroll' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <AddStaffGroup
                            dataPermission={dataPermission}
                            dataStaffGroup={dataStaffGroup} />
                    </Box>
                    <TableStaffGroup
                        dataStaffGroup={dataStaffGroup}
                    />

                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
