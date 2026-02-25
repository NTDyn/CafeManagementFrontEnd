import { getMenu, updateData } from "../../../redux/actions/menu";
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
import { getInitialData as getProduct } from "../../../redux/actions/products";
import SelectProduct from '../../../../src/components/admin/menuProduct/selectProduct'
import { updateData as updateMenuDetail } from "../../../redux/actions/menuDetail";
import { getInitialData as getMenuDetail } from "../../../redux/actions/menuDetail";

function UpdateMenu({ menuID, menuName, buttonLabel, isActive }) {
    const [active, setIsActive] = useState(isActive)
    const [open, setOpen] = useState(false);
    const [nameChange, setNameChange] = useState(menuName);
    const [selectedProducts, setSelectedProducts] = useState([])

    const dataMenu = useSelector(state => state.dataMenu.data)
    const dataProduct = useSelector(state => state.dataProduct.data)

    const dataMenuDetail = useSelector(state => state.dataMenuDetail.data);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMenu())
    }, [dispatch])

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])



    const UpdateFunction = async () => {

        let data = {

            "menu_ID": menuID,
            "menu_Name": nameChange,
            "isActive": active
        }
        await dispatch(updateData(data))

        if (selectedProducts.length > 0) {
            const detailPayload = selectedProducts.map(product => ({
                menu_ID: menuID,
                product_ID: product.product_ID,
                isActive: true
            }));
            await dispatch(updateMenuDetail(detailPayload));

        }
        Swal.fire("Updated successfully!", "", "success");
    };

    const confirmSwal = () => {
        const action = isActive ? "unlock" : "lock";
        withReactContent(Swal).fire({
            title: `Do you want to ${action} this menu?`,
            showDenyButton: true,
            confirmButtonText: action.charAt(0).toUpperCase() + action.slice(1),
            denyButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsActive(!isActive);
                UpdateFunction(); // hoặc truyền vào flag mới nếu cần
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };


    const existingMenu = dataMenu.find(
        menu => menu.menu_Name === nameChange && menu.menu_ID !== menuID
    );
    const confirmChangeNameSwal = (e) => {
        e.preventDefault()
        if (existingMenu) {
            Swal.fire("Menu name is existing");
        } else {
            withReactContent(Swal).fire({
                title: "Do you want to save information of menu?",
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
        }
        handleClose()
    }

    const handleClose = () => {
        setNameChange(menuName);
        setSelectedProducts([]);
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
                                    onClick={async () => {
                                        const response = await dispatch(getMenuDetail(menuID));
                                        const selected = Array.from(
                                            new Map(
                                                response?.map(item => [item.product.product_ID, item.product])
                                            ).values()
                                        );
                                        console.log(selected)
                                        setSelectedProducts(selected);
                                        setOpen(true);
                                    }}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </React.Fragment>



            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog sx={{ width: '70%' }}>
                    <DialogTitle>Change name of menu</DialogTitle>
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
                                    name="nameMenu"
                                    value={nameChange}
                                    onChange={(e) => setNameChange(e.target.value)}
                                />
                            </FormControl>
                            <SelectProduct
                                dataProduct={dataProduct}
                                selected={selectedProducts}
                                onChange={selected => setSelectedProducts(selected)}
                            ></SelectProduct>

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



export default UpdateMenu;
