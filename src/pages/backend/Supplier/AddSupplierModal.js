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
import { getInitialData, addData } from "../../../redux/actions/supplier";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function AddSupplierModal() {

    const [supplierName, setSupplierName] = useState("");
    const [open, setOpen] = useState(false);

    const dataSuppliers = useSelector(state => state.dataSupplier.data)



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    const existingSupplier = () => {

        dataSuppliers.find(
            dataSuppliers => dataSuppliers.supplier_Name === supplierName
        )
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleClose()
        if (existingSupplier()) {
            notificationSwal("Supplier name is existing!")
        } else {
            confirmSwal()
        }


    }


    const addSupplier = () => {
        let data = {
            "supplier_Name": "" + supplierName + "",
            "isActive": true
        }
        dispatch(addData(data));
    }


    const confirmSwal = () => {
        withReactContent(Swal).fire({
            title: "Do you want to add this supplier?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Add",
            denyButtonText: `Don't add`
        }).then((result) => {
            if (result.isConfirmed) {
                addSupplier()
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
        setSupplierName("");
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
                Add Supplier
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Create new supplier</DialogTitle>
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
                                    name="nameSupplier"
                                    value={supplierName}
                                    placeholder="Enter supplier name"
                                    onChange={(e) => setSupplierName(e.target.value)}
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
