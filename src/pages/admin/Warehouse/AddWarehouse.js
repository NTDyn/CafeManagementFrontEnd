
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
import { getInitialData, addData } from "../../../redux/actions/warehouse";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function AddWarehouse({ dataWarehouse }) {
    const [warehouseName, setWarehouseName] = useState("");
    const [warehouseAddress, setWarehouseAddress] = useState("");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch()

    function existingWarehouse() {

        const nameExists = dataWarehouse.some(item => item.wareHouse_Name === warehouseName);
        const addressExists = dataWarehouse.some(item => item.wareHouse_Address === warehouseAddress);

        if (nameExists || addressExists) {
            notificationSwal(nameExists ? "Warehouse name already exists." : "Warehouse address already exists.");
            return true;
        }
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!existingWarehouse()) {
            confirmSwal()
            handleClose()
        }
    }


    const addWarehouse = () => {
        let data = {
            "wareHouse_Name": "" + warehouseName + "",
            "wareHouse_Address": warehouseAddress,
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
                addWarehouse()
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
        setWarehouseName("");
        setWarehouseAddress("");
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="neutral"
                startIcon={<Add />}
                onClick={() => setOpen(true)}
            >
                Add Warehouse
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Create new warehouse</DialogTitle>
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
                                    name="nameWarehouse"
                                    value={warehouseName}
                                    onChange={(e) => setWarehouseName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Input
                                    required
                                    name="addressWarehouse"
                                    value={warehouseAddress}
                                    onChange={(e) => setWarehouseAddress(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                type="submit"

                            >
                                Add
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
