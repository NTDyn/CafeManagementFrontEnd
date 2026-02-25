import { updateData } from "../../../../redux/actions/staffGroup";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PropTypes from "prop-types";
import { Button } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Grid from '@mui/material/Grid2';
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

function UpdateStaffGroup({ dataStaffGroup, staffGroup, buttonLabel }) {
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(staffGroup.isActive)
    const [nameChange, setNameChange] = useState(staffGroup.staffGroup_Name);


    const dispatch = useDispatch();
    const UpdateFunction = () => {

        let data = {
            "staffGroup_ID": staffGroup.staffGroup_ID,
            "staffGroup_Name": nameChange,
            "isActive": isActive ? false : true
        }
        dispatch(updateData(data))
    };


    const confirmSwal = () => {
        if (isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this level?",
                showDenyButton: true,
                confirmButtonText: "UnLock",
                denyButtonText: `Cancel`
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
                title: "Do you want to lock this level?",
                showDenyButton: true,
                confirmButtonText: "Lock",
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

    const existingGroup = dataStaffGroup.find(
        data => data.staffGroup_Name === nameChange && data.staffGroup_ID !== staffGroup.staffGroup_ID
    );
    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (nameChange !== staffGroup.staffGroup_Name) {
            if (existingGroup) {
                Swal.fire("Position is existing");
                return
            }
        }

        withReactContent(Swal).fire({
            title: "Do you want to change information of customer level?",
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

        handleClose()
    }

    const handleClose = () => {

        setOpen(false);
    };



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
                                            width: '80px', bgcolor: staffGroup.isActive ? '#23a736' : '#d32f2f', // Xanh nếu active, đỏ nếu inactive
                                            color: '#fff', // Chữ trắng
                                            '&:hover': {
                                                bgcolor: staffGroup.isActive ? '#1e8e3e' : '#c62828' // Hover đậm hơn
                                            }
                                        }
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
                    <DialogTitle>Change information of staff position</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={confirmChangeNameSwal}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name Position</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameLevel"
                                    value={nameChange}
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



export default UpdateStaffGroup;
