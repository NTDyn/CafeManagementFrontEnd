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
import { getInitialData, addData } from "../../../redux/actions/productCategory";
import { postAPI } from "../../../api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function AddCategoryModal() {

    const [categoryName, setCategoryName] = useState("");
    const [open, setOpen] = useState(false);

    const dataProductCategory = useSelector(state => state.dataProductCategory.data)



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const existingCategory = dataProductCategory.find(
        dataProductCategory => dataProductCategory.category_Name === categoryName
    );

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleClose()
        if (existingCategory) {
            notificationSwal("Category name is existing!")
        } else {
            confirmSwal()
        }


    }


    const addCategory = () => {
        let data = {
            "category_Name": "" + categoryName + "",
            "isActive": true
        }
        dispatch(addData(data));
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
                addCategory()
                Swal.fire("Saved!", "", "success");
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
        setCategoryName("");
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Category
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Create new category of product</DialogTitle>
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
                                    name="nameCategory"
                                    value={categoryName}
                                    placeholder="Nhập tên Category"
                                    onChange={(e) => setCategoryName(e.target.value)}
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
        </React.Fragment>
    );
}
