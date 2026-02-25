import { getInitialData, updateData } from "../../../redux/actions/productCategory";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { putAPI } from "../../../api";
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

function UpdateCategory({ categoryID, categoryName }) {
    const [open, setOpen] = useState(false);
    const [nameChange, setNameChange] = useState(categoryName);
    const dataProductCategory = useSelector(state => state.dataProductCategory.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    useEffect(() => {
        setNameChange(categoryName);
    }, [categoryName]);

    const UpdateFunction = () => {

        let data = {

            "category_ID": categoryID,
            "category_Name": nameChange
        }
        dispatch(updateData(data))
    };

    const UpdateIsActive = () => {

        let data = {

            "category_ID": categoryID,
            "isActive": false
        }
        dispatch(updateData(data))
    };
    const confirmSwal = () => {

        withReactContent(Swal).fire({
            title: "Do you want to delete this category?",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateIsActive()
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })


    }

    const existingCategory = dataProductCategory.find(
        cat => cat.category_Name === nameChange && cat.category_ID !== categoryID
    );
    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (existingCategory) {
            Swal.fire("Category name is existing");
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to change name of category?",
                showDenyButton: true,
                confirmButtonText: "Change",
                denyButtonText: `Cancel`
            }).then((result) => {
                if (result.isConfirmed) {
                    UpdateFunction();
                    handleClose();
                    Swal.fire("Saved!", "", "success");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }

    }

    const handleClose = () => {
        setNameChange(categoryName);
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
                                        { width: '80px', bgcolor: '#23a736' }
                                    }
                                    onClick={confirmSwal}

                                >
                                    Delete
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
                    <DialogTitle>Change name category of product</DialogTitle>
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
                                    name="nameCategory"
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

// DeleteCategory.propTypes = {
//     categoryID: PropTypes.number.isRequired,
// }


export default UpdateCategory;
