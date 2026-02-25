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
import { getMenu, addData, deleteData } from "../../../redux/actions/menu";
import { addData as addMenuDetail } from "../../../redux/actions/menuDetail";
import { getInitialData as getProduct } from "../../../redux/actions/products";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import SelectProduct from '../../../../src/components/admin/menuProduct/selectProduct'

export default function AddMenu() {

    const [menuName, setMenuName] = useState("");
    const [open, setOpen] = useState(false);

    const dataMenu = useSelector(state => state.dataMenu.data)
    const dataProduct = useSelector(state => state.dataProduct.data)

    const [selectedProducts, setSelectedProducts] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMenu())
    }, [dispatch])

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])

    const existingMenu = () => {

        return dataMenu.find(
            dataMenu => dataMenu.menu_Name === menuName
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!menuName.trim()) {
            return notificationSwal("Menu name is required!");
        }

        if (existingMenu()) {
            return notificationSwal("Menu name is existing!");
        }

        if (selectedProducts.length === 0) {
            return notificationSwal("Please select at least one product!");
        }

        handleClose();
        confirmSwal();
    }


    const addMenu = async () => {

        const menuPayload = {
            menu_Name: menuName,
            isActive: true,
        };

        const menuData = await dispatch(addData(menuPayload));

        if (menuData.data?.menu_ID) {
            const menu_ID = menuData.data.menu_ID;

            const detailsPayload = selectedProducts.map(product => ({
                menu_ID: menu_ID,
                product_ID: product.product_ID,
                isActive: true
            }));

            const detailResponse = await dispatch(addMenuDetail(detailsPayload))
            if (detailResponse.status === 200) {
                Swal.fire("Success!", "", "success");
                dispatch(getMenu());
            } else {
                await deleteData(menu_ID);
                Swal.fire("Error", "Failed to create menu details. Menu was removed.", "error");
            }

        } else {
            Swal.fire("Error", "Failed to create menu", "error");
        }
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
                addMenu()
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
        setMenuName("");
        setOpen(false);
    };

    return (
        <React.Fragment >
            <Button
                variant="outlined"
                color="neutral"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Menu
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} >
                <ModalDialog sx={{ width: '70%' }}>
                    <DialogTitle>Create new menu</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameMenu"
                                    value={menuName}
                                    placeholder="Nhập tên Menu"
                                    onChange={(e) => setMenuName(e.target.value)}
                                />
                            </FormControl>

                            <SelectProduct
                                dataProduct={dataProduct}
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
        </React.Fragment>
    );
}
