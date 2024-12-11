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
import { getInitialData, addData } from "../../../../redux/actions/customerLevel";
import Swal from 'sweetalert2'
import Grid from '@mui/material/Grid2';
import withReactContent from 'sweetalert2-react-content'

export default function AddLevel() {
    const [pointApply, setPointApply] = useState('')
    const [levelName, setLevelName] = useState("");
    const [open, setOpen] = useState(false);

    const dataCustomerLevel = useSelector(state => state.dataCustomerLevel.data)



    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getInitialData())
    }, [dispatch])

    function existingLevel() {

        return dataCustomerLevel.find(
            data => data.level_Name === levelName
        )
    };

    function handleSubmit(e) {
        e.preventDefault()

        if (existingLevel()) {
            Swal.fire("Level name is existing", "", "error");
            return;
        } else {

            confirmSwal()
        }
    }

    function addLevel() {
        let data = {
            "level_Name": "" + levelName + "",
            "pointApply": pointApply
        }
        dispatch(addData(data));
    }


    function confirmSwal() {
        withReactContent(Swal).fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            if (result.isConfirmed) {
                handleClose()
                addLevel()
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }

        })
    }

    function handleClose() {
        setLevelName("");
        setPointApply("")
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
                Add Customer Level
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Add new customer level</DialogTitle>
                    <DialogContent>Fill in the information.</DialogContent>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Name Level</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    name="nameLevel"
                                    value={levelName}
                                    onChange={(e) => setLevelName(e.target.value)}
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
                                Add
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
