import { getInitialData, updateData } from "../../../../redux/actions/customerLevel";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
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
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

function UpdateCustomerLevel({ customerLevel, buttonLabel }) {
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(customerLevel.isActive)
    const [pointApply, setPointApply] = useState(customerLevel.pointApply)
    const [nameChange, setNameChange] = useState(customerLevel.level_Name);
    const dataCustomerLevel = useSelector(state => state.dataCustomerLevel.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const UpdateFunction = () => {

        let data = {
            "level_ID": customerLevel.level_ID,
            "level_Name": nameChange,
            "pointApply": pointApply,
        }
        dispatch(updateData(data))
    };

    const UpdateIsActive = () => {

        let data = {
            "level_ID": customerLevel.level_ID,
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
                    UpdateIsActive()
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
                    UpdateIsActive()
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const existingLevel = dataCustomerLevel.find(
        data => data.level_Name === nameChange
    );
    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (nameChange !== customerLevel.level_Name) {
            if (existingLevel) {
                Swal.fire("Level name is existing");
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
                    <DialogTitle>Change information of customer level</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={confirmChangeNameSwal}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name Level</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameLevel"
                                    value={nameChange}
                                    onChange={(e) => setNameChange(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Point Apply</FormLabel>
                                <Input
                                    required
                                    name="pointApply"
                                    value={pointApply}
                                    onChange={(e) => setPointApply(e.target.value)}
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


export default UpdateCustomerLevel;
