import { getInitialData, updateData } from "../../../redux/actions/ingredientCategory";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content'
import { Box } from "@mui/material";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

function UpdateIngredientCategory({ categoryID, category_Name, buttonLabel, isActive }) {
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(category_Name);
    const dataProductCategory = useSelector(state => state.dataProductCategory.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const UpdateInformation = () => {

        let data = {
            "ingredient_Category_ID": categoryID,
            "ingredient_Category_Name": categoryName,
            "isActive": null
        }
        dispatch(updateData(data))
    };

    const UpdateIsActive = () => {

        let data = {
            "ingredient_Category_ID": categoryID,
            "ingredient_Category_Name": null,
            "isActive": isActive
        }
        dispatch(updateData(data))
    };

    const confirmIsActive = () => {
        console.log("confirm")
        if (isActive === false) {
            withReactContent(Swal).fire({
                title: "Do you want to lock this category?",
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
        if (isActive === true) {
            withReactContent(Swal).fire({
                title: "Do you want to unlock this category?",
                showDenyButton: true,
                confirmButtonText: "Unlock",
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

    const existingCategory = dataProductCategory.find(
        dataProductCategory => dataProductCategory.category_Name === categoryName
    );
    const confirmInformation = (e) => {
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
                    UpdateInformation();
                } else if (result.isDenied) {
                    Swal.fire("Changes are not saved", "", "info");
                }

            })
        }
        handleClose()
    }

    const handleClose = () => {
        setCategoryName(null);
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
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{ width: '80px', bgcolor: '#23a736' }}
                                onClick={confirmIsActive}
                            >
                                {buttonLabel}
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                sx={{ width: '80px', bgcolor: '#185ea5' }}
                                onClick={() => setOpen(true)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>



                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog>
                        <DialogTitle>Change name category of product</DialogTitle>
                        <DialogContent>Fill in the information.</DialogContent>
                        <form
                            onSubmit={confirmInformation}
                        >
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        autoFocus
                                        required
                                        name="nameCategory"
                                        value={categoryName ? categoryName : ''}
                                        onChange={(e) => setCategoryName(e.target.value)}
                                    />
                                </FormControl>

                                <Button
                                    type="submit"

                                >
                                    Update
                                </Button>
                            </Stack>
                        </form>
                    </ModalDialog>
                </Modal>
            </React.Fragment >
        </ >
    );
};

// DeleteCategory.propTypes = {
//     categoryID: PropTypes.number.isRequired,
// }


export default UpdateIngredientCategory;
